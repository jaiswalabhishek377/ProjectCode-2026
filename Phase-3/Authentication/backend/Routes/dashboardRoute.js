import {Router} from "express"
import authMiddleware from "../Middleware/auth";
const dashRouter= Router();


dashRouter.post("/dash",authMiddleware,);

export default dashRouter;