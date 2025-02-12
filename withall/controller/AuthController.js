const UserModel = require("../models/UserModel")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const signUp=async(req,res)=>{
try{
    const {name,email,password,role,profileImage}=req.body;
    const user=await UserModel.findOne({email})
    if(user){
        return res.status(400).json({
            message:"User already exsist",
            success:false
        })
    }
    const hashPassword=await bcrypt.hash(password,10)

    const createUser=new UserModel({name,email,password:hashPassword,role,profileImage})
    await createUser.save()
    res.status(200).json({
        message:"user create successfully"
    })

}catch(error){
    res.status(500).json({
        message:"Please provide valid information",
        success:false
    })
}
}
const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        let { name, email, password, role } = req.body;
        let updateData = { name, email, role };

        // Handle profileImage if uploaded
        if (req.file) {
            updateData.profileImage = req.file.path;
        }

        // Hash the password if provided
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updateUser = await UserModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updateUser) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            success: true,
            data: updateUser
        });
    } catch (error) {
        console.error('Error in updateEmployee:', error);
        res.status(500).json({
            message: "An error occurred while updating user",
            success: false
        });
    }
};

const login = async (req, res) => {
    try {
        const { name, email, password,role } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(403).json({ message: "Invalid password" })
        }
        const jwtToken = jwt.sign(
            { role: user.role, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }

        )
        res.status(200).json({
            message: "login successfully",
            success: true,
            jwtToken,
            user: { name: user.name, email: user.email, role: user.role },
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'internal server error' })
    }
}

const getAllUsers = async (req, res) => {
    try {
        let { page, limit, search } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;

        const skip = (page - 1) * limit;

        let searchCriteria = {}
        if (search) {
            searchCriteria = {
                name: { $regex: search, $options: 'i' }
            };
        }

        const totalEmployees = await UserModel.countDocuments(searchCriteria);
        console.log(totalEmployees)
        const getUsers = await UserModel.find(searchCriteria)
            .skip(skip)
            .limit(limit)
            .sort({ updatedAt: -1 });

        const totalPages = Math.ceil(totalEmployees / limit)

        res.status(200).json({
            message: "Employees fetched successfully",
            success: true,
            data: {
                employees: getUsers,
                pagination: {
                    totalEmployees,
                    totalPages,
                    currentPage: page,
                    pageSize: limit
                }
            }
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message || "Failed to fetch users"
        });
    }
};

module.exports={
    signUp,
    login,
    getAllUsers,
    updateEmployee
}