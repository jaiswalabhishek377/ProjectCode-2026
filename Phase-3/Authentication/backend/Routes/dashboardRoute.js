import {Router} from "express"
import authMiddleware from "../Middleware/auth.js";
import getUserInfo from "../Controllers/dashboardController.js";
const dashRouter= Router();

dashRouter.get("/me",authMiddleware,getUserInfo);

export default dashRouter;