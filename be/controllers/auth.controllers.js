import User from '../models/user.model.js';
import bcrypt from  'bcryptjs';

export const signup = async (req, res) => {
try {
const {fullName, username, email, password} = req.body;
const emailRegex = /^[^\s@]+@[^\s@]+\• [^\s@]+$/;
if (!emailRegex.test(email)) {
return res.status(400).json({ error: "Invalid email format" });
}
const existingUser = await User.findOne({ username });
if(existingUser){
    return res.status(400).json({error: "username already taken"});
}
const existingEmail = await User.findOne({ eamil });
if(existingEmail){
    return res.status(400).json({error: "email already registered "});
}
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash (password, salt);
const newUser = new User({
fullName,
username,
email,
password: hashedPassword
})
if (newUser) {
generateTokenAndSetCookie(newUser._id, res)
await newUser.save();
res.status(201).json({
    _id: newUser._id,
    fullName: newUser.fullName,
    username: newUser.username,
    email: newUser.email,
   
}) 
}
else{
    res.status(400).json({ error: "Invalid user data" });
}
} catch (error) {
    console.log("Error in signup controller", error.message);

res.status(500).json({ error: "Internal Server Error" });
}
};

export const login = async(req,res)=>{
    res.json({
        data: " you hit the login endpoint",
    });
}

export const logout = async(req,res)=>{
    res.json({
        data: " you hit the logout endpoint",
    });
}
