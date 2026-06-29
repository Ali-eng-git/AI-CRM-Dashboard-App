import {User} from '../models/User.js'
import {asyncHandler} from '../utils/AsyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {generateToken} from "../utils/generateToken.js"
import { loginSchema, registerSchema } from '../validations/auth.validation.js'

const toClientUser = (user)=>({
    id:user.id,
    name:user.name,
    email:user.email,
    role:user.role,
    company:user.company,
    avatar:user.avatar,
    createdAt:user.createdAt,
})

export const register = asyncHandler(async(req,res)=>{
    const result = registerSchema.safeParse(req.body)

    if (!result.success) {
        throw new ApiError(400,result.error.issues[0].message);  
    }

    const {name,email,password,company} = result.data

    const exists = await User.findOne({email:email.toLowerCase()})
    if(exists){
        throw new ApiError(409,"An account with that email already exists")
    }

    const user = await User.create({name,email,password,company})

    res.status(201).json({
        success:true,
        token:generateToken(user._id),
        user:toClientUser(user)
    })
})

export const login = asyncHandler(async(req,res)=>{
    const result = loginSchema.safeParse(req.body)
    if (!result.success) {
        throw new ApiError(400,result.error.issues[0].message);
    }

    const {email,password} = result.data

    const user = await User.findOne({email:email.toLowerCase()}).select("+password")
    if (!user || !(await user.matchPassword(password))) {
        throw new ApiError(401,"Invalid email or password")
    }
    console.log(generateToken(user._id),)
    res.status(200).json({
        success:true,
        token:generateToken(user._id),
        user:toClientUser(user)
    })
})

export const getMe = asyncHandler(async(req,res)=>{
    res.status(200).json({success:true, user:toClientUser(req.user)})
})

export const updateProfile = asyncHandler(async (req, res) => {
  const validatedData = updateProfileSchema.parse(req.body);

  const user = await User.findByIdAndUpdate(
    req.user._id,
    validatedData,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success:true,
    user:toClientUser(user)
  });
});