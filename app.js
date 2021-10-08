const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));


mongoose.connect("mongodb://localhost:27017/invoiceDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const dataSchema = {
  code: Number,
  Item: String,
  unit:Number,
  cost: Number,
};

const Data = new mongoose.model('Data', dataSchema);
let d = new Date().toISOString().slice(0, 10)

app.get("/",function(req,res){
  res.render("index",{res:[],total:0,date:d});
})

app.post("/",function(req,res){
   // console.log(req.body.code);
   // console.log(req.body.description);
   // console.log(req.body.unit);
   // console.log(req.body.cost);


Data.find(function(err,result){
  if(err){
    console.log(err);
  }
  else{
    const data=new Data({
      code:req.body.code*1,
      Item: req.body.description,
      unit:req.body.unit,
      cost: req.body.cost,
    })

    data.save();
}
    })
setTimeout(function(){

  Data.find(function(err,finals){
  var total=0;
  finals.forEach((item, i) => {
    total=(item.cost*item.unit)+total;
  });
    res.render("index",{res:finals,total:total,date:d});
  })

 }, 1000);



})


app.listen(3000, function() {
  console.log("Server Started on 3000");
})
