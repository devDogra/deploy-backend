require('dotenv').config(); 
const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 

// mongoose.connect('mongodb://127.0.0.1:27017/deploy1');
mongoose.connect(process.env.DB_URI);
const app = express(); 
app.use(express.json()); 
app.use(express.urlencoded()); 
app.use(cors()); 

const Message = mongoose.model("Message", {
    content: String,
})

app.get('/messages', async (req, res) => {
    const msgs = await Message.find(); 
    res.send(msgs); 
})

app.post('/messages', async (req, res) => {
    const content = req.body.content;
    const msg = new Message({ content });
    await msg.save(); 
    res.send("OK"); 
})
app.delete('/messages', async (req, res) => {
    await Message.deleteMany(); 
    res.send("Deleted");
})


app.listen(3000, () => {
    console.log("Server started"); 
})