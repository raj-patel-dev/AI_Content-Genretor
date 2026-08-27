import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const register = asyncHandler(async (req, res) => {

  const { name, password, email } = req.body;
    if(!name || !password || !email){
        res.status(400);
        throw new Error("please all fields are required");
    }
  const userExists = await User.findOne({email});
  if(userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password,salt);
  const newUser = new User({
    name,
    password:hashedPassword,
    email
  });

  newUser.trialExpires = new Date(
    new Date().getTime() + newUser.trialPeriod * 24 * 60 * 60 * 1000
  );

  await newUser.save();

  res.json({
    status:true,
    message: "Registration was Succesful",
    user: {name,email}
  });
})


export const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password) {
      res.status(400);
      throw new Error("Email and Password are required");
    }

    const user = await User.findOne({email});
    if(!user) {
      res.status(401);
       throw new Error("Invalid email or Password");
    }

    const isMatch = await bcrypt.compare(password,user?.password);
    if(!isMatch){
      res.status(401);
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign({id:user?._id},
    process.env.JWT_SECRET,{
      expiresIn:"3d",
    });

    res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000,
});

    res.json({
      status:"success",
      _id:user?._id,
      message:"Login success",
      username:user?.name,
      email:user?.email,
      token
    });
});

export const logout = asyncHandler(async(req,res) => {
  res.cookie("token" , "" ,{maxAge:1});
  res.status(200).json({message:"Logged out successfully" });
});

export const userProfile = asyncHandler(async(req,res) => {
  const user = await User.findById(req?.user?.id).select("-password").populate("payments").populate("contentHistory");
  if(user){
    res.status(200).json({status:"success",user});
  }
  else{
    res.status(404);
    throw new Error("User not found");
  }
});

export const checkAuth = asyncHandler(async (req, res) => {
  try {
    let token = null;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.json({ isAuthenticated: false });
    }

    jwt.verify(token, process.env.JWT_SECRET);

    return res.json({ isAuthenticated: true });

  } catch (err) {
    return res.json({ isAuthenticated: false });
  }
});
