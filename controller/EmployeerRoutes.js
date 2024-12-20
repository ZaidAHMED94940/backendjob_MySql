const express=require("express");
const router=express.Router();
const Employee=require("../models/EmployerModel")
const Applicant=require("../models/ApplicationModel")
const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken")

router.post('/create-employee',async(req,res)=>{
    try{
        const {name,email,number,password}=req.body
        if(!name || !email || !number || !password){
            return res.status(400).json({message:"Please fill in all fields."})
        }
        const existingEmployee = await Employee.findOne({ where:{email} });
        if (existingEmployee) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 8);

        // Create a new employee
        const newEmployee = await Employee.create({ name, email, number, password: hashedPassword });

        res.status(201).json({message:"Employee created successfully",data:newEmployee})
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
})
router.post('/create-applicant',async(req,res)=>{
    const {name,email,number,password}=req.body;
    try {
        if(!name || !email || !number || !password){
            res.status(409).json({message:"Please fill in all the details"});
        }
        const existingApplicant = await Applicant.findOne({ where:{email} });
        if (existingApplicant) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 8);
        const newApplicant=await Applicant.create({name,email,number,hashedPassword});
        res.status(201).json({message:"Applicant created successfully",data:newApplicant});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
})

router.get('/applicant/:email',async(req,res)=>{  
    const email=req.params.email;
    try {
        const applicant=await Applicant.findOne({where:{email}});
        if(!applicant){
            res.status(410).json({message:"Invalid applicant"});
        }
        res.status(200).json({message:"Applicant found",data:applicant});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
})

router.post('/employer/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await Employee.findOne({ where: { email } });
        console.log(user,"llll")
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { role: user.role, name: user.name }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '8h' } // Token expiry time
        );
        const role="employee"

        res.status(200).json({ 
            message: "Login successful", 
            token 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.post('/applicant/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await Applicant.findOne({ where: { email } });
        console.log(user,"llll")
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { role: user.role, name: user.name }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '8h' } // Token expiry time
        );

        res.status(200).json({ 
            message: "Login successful", 
            token 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports=router;