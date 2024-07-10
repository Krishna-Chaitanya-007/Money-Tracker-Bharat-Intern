import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
dotenv.config();
const MONGODB_USERNAME = process.env.MONGODB_USERNAME
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD

mongoose.connect(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.a28ol23.mongodb.net/MoneyTrackerDB`);
const db = mongoose.connection  
db.on("error", ()=>{
    console.log("Error in connecting to the Database");
})
db.once('open', ()=>{
    console.log("Connected to the Database");
})

app.post("/add", (req,res)=>{
    const category_select = req.body.category_select
    const ammount_input = req.body.amount_input
    const info = req.body.info
    const date_input = req.body.date_input

    const data = {
        "Category": category_select,
        "Amount": ammount_input,
        "Info": info,
        "Date": date_input
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err
        }
        console.log("Record inserted successfully");    
    })
})

app.get("/", (req,res)=>{
    res.set({"Access-Control-Allow-Origin": "*"});
    return res.redirect("index.html");
}).listen(5000);


console.log("listening port from 5000");