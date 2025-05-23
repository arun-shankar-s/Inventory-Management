const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const productRoute=require('./routes/productRoute')

const app=express()

app.use(cors())
app.use(express.json())

//mongoose.connect().then().catch()
mongoose.connect('mongodb://localhost:27017/product')
.then(()=>console.log('Mongodb Connected'))
.catch((err)=>console.error('Mongodb connection error',err))

app.use('/api/products',productRoute)

//app.get()
app.get('/',(req,res)=>{
    res.send('Portfolio backend running')
})

//app.listen()
app.listen(3000,()=>{
    console.log("Server connected")
})


