import User from "../model/User.js";
import Order from "../model/Order.js";
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

export const registerUser = async(req,res) => {
    const {
        name,
        email, 
        password,
        role
    } = req.body;
   
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await User.create({name, email, password:hashedPassword,role});
    return res.status(200).json({
        status:"success",
        message:"User registered"
    })
}
export const loginUser = async(req,res,next) => {

    try{
const {email, password} = req.body;

const user = await User.findOne({email});

if(!user){
    return res.status(500).json({
        status:"error",
        message:'email not found'
    })
}

const isMatch = await bcrypt.compare(password,user.password);

if(!isMatch){
    return res.status(500).json({
        status:"error",
        message:'Incorrect password'
    }) 
}

const token = jsonwebtoken.sign(
    {
        userId:user._id,
        role:user.role
    },
    process.env.JWT_SECRET,
    {expiresIn: "1d"}
);

return res.status(200).json({
    status:"success",
    data: user,
    token:token
});
}
catch(err){
 next(err);
}
}


export const getallUsers = async(req,res) => {
    try{
        const users = await User.find();
        return res.status(200).json({
            status:"success",
            message: users,
        })
    }
catch(err){
    return res.status(404).json({
       status:"error",
       message:"Got the error" 
    })
}
}

export const googleAuthCallback = async (req, res) => {
    try {
        if (!req.user) {
            return res.redirect('http://localhost:5173/login?error=auth_failed');
        }
        const email = req.user.emails[0].value;
        const name = req.user.displayName || (req.user.name ? `${req.user.name.givenName} ${req.user.name.familyName}` : "Google User");

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                role: 'admin'
            });
        }

        const token = jsonwebtoken.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.redirect(`http://localhost:5173/login?token=${token}&role=${user.role}`);
    } catch (err) {
        console.error(err);
        return res.redirect('http://localhost:5173/login?error=server_error');
    }
};

