const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const app = express()
const cors=require('cors')
const bodyParser=require('body-parser')
const ObjectID = require('mongodb').ObjectID
require('dotenv').config()


const port = process.env.PORT ||5055;


app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.scyee.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });






client.connect(err => {
const collection = client.db("teaShop").collection("products");
const OrderCollection = client.db("teaShop").collection("order");

app.post('/orders',(req,res) => {
  const orderInfo=req.body;
  OrderCollection.insertOne(orderInfo)
  .then(result => {
    // console.log(result);
    res.send(result.insertedCount>0);
  })
  }
)

app.get('/order',(req,res) => {
  OrderCollection.find({})
  .toArray((err, documents) => {
    res.send(documents);
  })
})

app.delete('/delete/:id',(req,res)=> {
 collection.deleteOne({_id : ObjectID(req.params.id)})
 .then((result) => {
   res.send(result.deletedCount > 0)
 })
})


app.get('/products',(req,res) => {
  collection.find()
  .toArray((err,items) => {
    res.send(items)
  })
})
app.get('/products/:id',(req,res) => {
  collection.find({_id: ObjectID(req.params.id)})
  .toArray((err,product) => {
    res.send(product)
  })
})
  app.post('/addFormData',(req,res) => {
    const formData=req.body;
    collection.insertOne(formData)
    .then(result => {
      res.send(result.insertedCount> 0)
    })
  })
  











});




app.listen(port)