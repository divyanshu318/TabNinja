import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/users.models.js";

export const verifyJWT = asyncHandler(async(req, _, next) => {
    try {

        let token;
        // Check if token exists in cookies
        if (req.cookies && req.cookies.accessToken) {
            token = req.cookies.accessToken;
            // console.log("Cookies:", req.cookies);
        }
        // If not in cookies, check Authorization header
        else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
            // console.log("Authorization Header:", req.headers.authorization);
        }


        // If token is still not found, throw an error
        if (!token) {
            console.error("Token not found.");
            throw new ApiError(401, "Unauthorized Access");
        }
        
        // console.log("Token:", token); // Add this line for debugging
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})