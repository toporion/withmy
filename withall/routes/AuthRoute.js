const { signUp, login, getAllUsers, updateEmployee, } = require('../controller/AuthController')
const { signupValidation, loginValidation} = require('../middlewares/AuthValidation');
const ensureAuthenticate = require('../middlewares/AuthVerify');
const upload = require('../middlewares/FileUploader')

const router=require('express').Router()

router.post('/signup', upload.single('profileImage'), signupValidation, signUp);
router.put('/employee/:id', upload.single('profileImage'), updateEmployee);
router.post('/login',loginValidation, login);
router.get('/login',getAllUsers);



module.exports=router

