import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  addGroupUsingUrl,
  createGroup,
  deleteGroup,
  fetchAllGroups,
} from "../controllers/group.controller.js";

const router = Router();
router.route("/addgroup").post(verifyJWT, createGroup);
router.route("/removegroup").post(verifyJWT, deleteGroup);
router.route("/addgroupusingurl").post(verifyJWT, addGroupUsingUrl);
router.route("/getgroups").post(verifyJWT, fetchAllGroups);
export default router;
