import express from "express";
import mongoose from "mongoose";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());
app.listen(8080, () => {
  console.log("Server started");
});

let products = [];

app.post("/products", async (req, res) => {
  console.log(req.body);
  const body = await req.body;
  products.push(body);
  res.json(body)
});

app.get("/products", async (req, res) => {
  res.json(products);

});

// Here I am trying to create a schema for products and use it 

// const productSchema = mongoose.Schema({
//     id: {type: Number},
//   name: {type: String},
//   desc: {type: String},
//   price: {type: Number},
//   imgUrl: {type: String},
// });

// const productModel = mongoose.model("product", productSchema);



const userSchema = mongoose.Schema({
  name: {type: String},
  email: {type: String},
  pass: {type: String},
});

const userModel = mongoose.model("user", userSchema);
const url = "mongodb+srv://spkumar:1234@cluster0.u2v9bhw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(url).then(()=>{
  app.listen(8080,()=>{
    console.log("Server Started");
  });
});

let users = [];

app.get("/users", async (req, res) => {
  res.json(users);

});

app.post("/users",async(req, res)=>{
  // console.log(req.body);
  // const body=await req.body;
  // users.push(body);
  // res.json(body);

const body = req.body;
const user = await userModel.create(body);
res.json(user);

});

app.post("/login", async(req, res)=>{
  const body = req.body;
  const found = await userModel.findOne({email: body.email, pass: body.pass});
  res.json(found);
})