import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

// Helper: Calculate Total Users, Products, Sales Count, and Total Revenue
export const getAnalyticsData = async () => {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const salesData = await Order.aggregate([
        {
            $group: {
                _id: null, // Groups all documents together
                totalSales: { $sum: 1 }, // Counts total number of orders
                totalRevenue: { $sum: "$totalAmount" } // Sums up totalAmount field
            }
        }
    ]);

    const { totalSales, totalRevenue } = salesData[0] || { totalSales: 0, totalRevenue: 0 };

    return {
        users: totalUsers,
        products: totalProducts,
        totalSales,
        totalRevenue
    };
};

// Helper: Generate Daily Sales & Revenue Breakdown for Recharts graphs
export const getDailySalesData = async (startDate, endDate) => {
    try {
        const dailySalesData = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    sales: { $sum: 1 },
                    revenue: { $sum: "$totalAmount" }
                }
            },
            { $sort: { _id: 1 } } // Sort chronologically ascending
        ]);

        // Array of dates between startDate and endDate
        const dateArray = getDatesInRange(startDate, endDate);

        return dateArray.map((date) => {
            const foundData = dailySalesData.find((item) => item._id === date);
            return {
                date,
                sales: foundData ? foundData.sales : 0,
                revenue: foundData ? foundData.revenue : 0
            };
        });
    } catch (error) {
        throw error;
    }
};

// Utility function to get array of YYYY-MM-DD formatted dates in a range
function getDatesInRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

// @desc    Get dashboard analytics & daily sales data
// @route   GET /api/analytics
// @access  Private/Admin
export const getAnalytics = async (req, res) => {
    try {
        const analyticsData = await getAnalyticsData();

        const endDate = new Date();
        const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000); // Past 7 days

        const dailySalesData = await getDailySalesData(startDate, endDate);

        res.json({
            analyticsData,
            dailySalesData
        });
    } catch (error) {
        console.error("Error in getAnalytics controller:", error.message);
        res.status(500).json({ message: "Server error fetching analytics", error: error.message });
    }
};
