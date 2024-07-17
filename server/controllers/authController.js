import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import router from './../routes/authRoute.js';

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }
    if (!phone) {
      return res.send({ error: "Phone is Required" });
    }
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "User Already Exist",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new userModel({ name, email, phone, password: hashedPassword }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successful",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//Login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not Registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    //token
    const accestoken = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "15s" });
    const refreshtoken = await JWT.sign({ _id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "2m" });
    res.status(200).send({
      success: true,
      message: "Login Successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      accestoken,refreshtoken
    });

    router.post("/token", (req,res)=>{
      const {token}=req.body;
      if(!token) return res.sendStatus(401);

      JWT.verify(token, JWT_REFRESH_SECRET,(error,user)=>{
        if(error) return res.sendStatus(403);

        const accesstoken=JWT.sign({_id: user._id},JWT_SECRET,{expiresIn:"15s"});
        res.json({accesstoken});
      })
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//testcontroller
export const testController = (req, res) => {
  res.send("protected Route");
};
