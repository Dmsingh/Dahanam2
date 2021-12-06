const express = require('express'); 
const cors= require('cors');
const bodyParser = require('body-parser')
const dotenv= require('dotenv')
const sgMail= require('@sendgrid/mail')

const {MongoClient}= require('mongodb')
const route1 =require( './routes/route1.js')

const app = express();
const PORT = process.env.PORT || 3000;  // Remove 3000 when sending into production

app.use(bodyParser.json());
app.use(cors());



const uri = "mongodb+srv://admin:admin123@cluster0.1auic.mongodb.net/signupdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
dotenv.config();

app.get('/', (req, res) => {
    res.send("Welcome to Twilio Email Testing...");
})

app.use('/email', route1);

app.all('*', (req, res) => {
    res.send("You've tried reachin a route that doesn't exist...");
})

app.listen(PORT, (req, res) => {
    console.log(`Server running at ${PORT}...`);
})