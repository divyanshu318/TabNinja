import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Tab } from "../models/tab.models.js";
import { Group } from "../models/group.models.js";

const addTab = asyncHandler(async (req, res) => {
  const { name, favicon, url, groupId } = req.body;
  if ([name, url].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Name or Url not found");
  }
  // const existedTab= await Tab.findOne({
  //     $or:[{url}]
  // })

  const user = req.user;
  const group = await Group.findById(groupId);

  if (!group) {
    throw new ApiError(500, "Group not found");
  }

  const tab = await Tab.create({
    name,
    favicon,
    url,
  });

  const tabCreated = await Tab.findById(tab._id);

  if (!tabCreated) {
    throw new ApiError(500, "Something went wrong while adding tab to group");
  }

  const groupIndex = user.group_list.indexOf(groupId);
  if (groupIndex === -1) {
    throw new ApiError(500, "Group not found in user's group list");
  }
  group.tabs.push(tab);

  await group.save();

  return res.status(201).json(new ApiResponse(200, null, "Tab added to Group"));
});

const removeTab = asyncHandler(async (req, res) => {
  const { tabId, groupId } = req.body;

  if ([groupId, tabId].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Details not recieved");
  }

  const group = await Group.findOne({ _id: groupId });
  if (!group) {
    throw new ApiError(404, "Group not found");
  }

  if (!group.tabs) {
    throw new ApiError(404, "Tab not found in the Group");
  }

  const tabIndex = group.tabs.findIndex((tab) => tab._id.toString() === tabId);
  if (tabIndex === -1) {
    throw new ApiError(404, "Tab is not present in the Group");
  }
  group.tabs.splice(tabIndex, 1);

  const deleteThis = await Tab.findOne({ _id: tabId });
  await Tab.deleteOne(deleteThis);
  const checkTabDeleted = await Tab.findById({ _id: tabId });
  if (checkTabDeleted) {
    throw new ApiError(500, "Tab could not be removed");
  }

  await group.save();

  return res.status(201).json(new ApiResponse(200,null, "Tab Deleted Successfully"));
});

const getTab = asyncHandler(async (req, res) => {
  const { groupId } = req.body;
  const data = await Group.findById(groupId)
    .populate({
      path: "tabs",
    })
    .select({ name: 1, tabs: 1 });
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Tabs data fetch successfull"));
});

export { addTab, removeTab, getTab };
