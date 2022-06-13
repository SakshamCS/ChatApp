//Let's create an API
//importing
import express from "express";
import mongoose from "mongoose";
import Messages from './dbMessages.js';
import dbConfig from './dbConfig.json';
import Pusher from "pusher";
import Cors from "cors";

//appconfig
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1402302",
    key: "e93ee4158a301dd010aa",
    secret: "e53d4fe82c92ef8fa2b2",
    cluster: "ap2",
    useTLS: true
  });
//middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
 res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","*");
  next();
})

//DB config
const connection_url =
  `mongodb+srv://Saksham100x:%GgdKPSr@cluster0.e1nen.mongodb.net/whatsappDB?retryWrites=true&w=majority`

mongoose.connect(connection_url,{
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection

db.once('open',()=>{
    console.log("Db connected");

    const msgCollection=db.collection("messagecontent");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change)=>{
      console.log("A change occured",change);

      if(change.operationType === 'insert'){
          const messageDetails = change.fullDocument;
          pusher.trigger('messages','inserted',
          {
             name:messageDetails.user,
             message: messageDetails.message
          });
      }else {
          console.log('Error triggering Pusher')
      }
    });
});

//api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/messages/sync", (req, res) => {
    Messages.find((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  });

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));
