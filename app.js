// Task1: initiate app and run server at 3000
const express=require("express");
require("dotenv").config();
var morgan=require("morgan");

const path=require('path');
const app=express();
app.use(express.json());

app.use(morgan("dev"));


app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 
const mongoose=require("mongoose");

const employeeSchema=mongoose.Schema({
    employeeName:String,
    employeeLocation:String,
    employeePosition:String,
    employeeSalary:Number,

    });
    const employeeModel = mongoose.model('employee',employeeSchema);
    


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

    //const mongoose=require("mongoose");

    mongoose
 .connect(process.env.mongo_url)
 .then(()=>{
console.log("db is connected");
 })
 .catch((err)=>{
    console.log(err);

 });


//TODO: get data from db  using api '/api/employeelist'

app.get("/api/employeelist",async(req,res)=>{
    try {
        var data=await employeeModel.find();
        res.status(200).send(data);
        
    } catch (error) {
        res.status(404).send("unable to getdata");
    
    }
    
    
    })


//TODO: get single data from db  using api '/api/employeelist/:id'



app.get("/api/employeelist/:id",async(req,res)=>{
    try {
        var data=await employeeModel.findById(req.params.id);
        res.status(200).send(data);
        
    } catch (error) {
        res.status(404).send("unable to getdata");
    
    }
    
     
    })

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post("/api/employeelist",async(req,res)=>{
    try {
        var item=req.body;
var data=new employeeModel(item);
await data.save();
res.status(200).send("data added successfully")
    } catch (error) {
        res.status(404).send("unable to send  data")
   
    }
});





//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete("/api/employeelist/:id",async(req,res)=>{




    try {
        await employeeModel.findByIdAndDelete(req.params.id);
        res.status(200).send("deleted successfully");
        
    } catch (error) {
        res.status(404).send("unable to delete data");

    }
   
})




//TODO: Update  a employee data from db by using api '/api/employeelist'

app.put("/api/employeelist/:id",async(req,res)=>{




    try {
        await employeeModel.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).send("edited successfully");
        
    } catch (error) {
        res.status(404).send("unable to edit data");

    }
   
})



//Request body format:{name:'',location:'',position:'',salary:''}


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});


app.listen(3000, ()=>{
    console.log(`listening to  port ${process.env.port}`);

})

