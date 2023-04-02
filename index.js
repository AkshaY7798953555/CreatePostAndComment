const express = require('express')
const app = express();
const  mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const route = require('./routes/route');

app.use(express.json())

mongoose.connect("mongodb+srv://Akshay:akshay7798953554@akshaydb.e6tjw4w.mongodb.net/MernStackDevoloper", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route)

app.listen(4000, function(){
 console.log("server running on port 4000");
}) 
