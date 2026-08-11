import User from "../models/userModel.js";

// Industry Standard Automated Admin Account Seeder
export const seedAdminUser = async () => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL || "admin@nexus.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "admin123456";

        const existingAdmin = await User.findOne({ email: adminEmail });

        if (!existingAdmin) {
            await User.create({
                name: "System Admin",
                email: adminEmail,
                password: adminPassword,
                role: "admin"
            });
            console.log(`🔐 Industry Standard Admin Account Created: ${adminEmail}`);
        }
    } catch (error) {
        console.error("Error seeding admin user:", error.message);
    }
};
