import { Router } from "express";
import { loginUser, logoutUser, registerUser, setTimeout, addTabData } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router=Router()
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
// Secure Routes
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/settimeout").post(verifyJWT,setTimeout)
router.route("/addtabdata").post(verifyJWT,addTabData)
export default router