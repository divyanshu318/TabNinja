import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addTab, getTab, removeTab } from "../controllers/tab.controller.js";

const router = Router();
router.route("/addtab").post(verifyJWT, addTab);
router.route("/removetab").post(verifyJWT, removeTab);
router.route("/gettabs").post(verifyJWT, getTab);

export default router;
