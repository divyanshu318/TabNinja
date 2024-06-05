import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"))
app.use(cookieParser())

// Routes import
import userRouter from "./routes/user.routes.js"
import groupRouter from "./routes/group.routes.js"
import tabRouter from "./routes/tab.routes.js"
// Routes Declare
app.use("/api/v1/users",userRouter)
app.use("/api/v1/tabs",tabRouter)
app.use("/api/v1/groups",groupRouter)

export {app}