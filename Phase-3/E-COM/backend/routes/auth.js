import express from "express"

import {login, signup, logout} from "../controllers/authController.js"

const authrouter = express.Router();

authrouter.get("/signup",signup);
authrouter.get("/login",login);
authrouter.get("/logout",logout);

export default authrouter;