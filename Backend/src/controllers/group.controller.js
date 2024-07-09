import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Group } from "../models/group.models.js";
import { User } from "../models/users.models.js";
import randomString from "randomstring";

const createGroup = asyncHandler(async (req, res) => {
  // Fetch data from frontend/postman
  const { name } = req.body;
  // Validation
  if (name.trim === "") {
    throw new ApiError(400, "Name is Required");
  }
  const userGroupList = req.user.group_list;
  const groupAlreadyExists = await Group.findOne({
    _id: { $in: userGroupList },
    name: name,
  });

  if (groupAlreadyExists) {
    throw new ApiError(400, "Group already exists");
  }

  const url = randomString.generate(8);

  const newGroup = await Group.create({
    name,
    url,
  });

  const newGroupCreated = await Group.findById(newGroup._id);

  if (!newGroupCreated) {
    throw new ApiError(500, "Something went wrong while creating the group");
  }

  req.user.group_list.push(newGroup);
  await req.user.save();

  return res
    .status(201)
    .json(new ApiResponse(200, newGroupCreated, "Group created successfully"));
});

const deleteGroup = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    throw new ApiError(400, "Select a Group to remove");
  }

  const group = Group.findById(id);
  if (!group) {
    throw new ApiError(400, "Group not found");
  }

  await Group.deleteOne(group);
  const checkGroupDeleted = await Group.findById(id);
  if (checkGroupDeleted) {
    throw new ApiError(500, "Group could not be deleted");
  }

  const user = req.user;

  const index = user.group_list.indexOf(id);
  if (index === -1) {
    throw new ApiError(404, "Group not found in user's group list");
  }

  // Remove the group ID from the array
  user.group_list.splice(index, 1);

  // Save the user model to persist the changes
  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(200, null, "Group Deleted Successfully"));
});

const addGroupUsingUrl = asyncHandler(async (req, res) => {
  const user = req.user;
  const { url } = req.body;
  const groupData = await Group.findOne({ url: url });
  if (!groupData) {
    const message = "invalid Url";
    throw new ApiError(400, message);
  }
  const addedUrlUser = await User.findByIdAndUpdate(user._id, {
    $push: { group_list: groupData._id },
  });
  return res.status(200).json(new ApiResponse(200, null, "Group added"));
});

const fetchAllGroups = asyncHandler(async (req, res) => {
  const user = req.user;
  const groupData = await User.findById(user._id)
    .populate({
      path: "group_list",
      select: "name url",
    })
    .select({ group_list: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, groupData, "Group Data fetch successfull"));
});

export { createGroup, deleteGroup, fetchAllGroups, addGroupUsingUrl };
