const mongoose=require('mongoose')
const mnogo_url=process.env.MONGO_URL

mongoose.connect(mnogo_url)
.then(res=>{
    console.log('mongodb connected successfully')
})