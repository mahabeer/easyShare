require("dotenv").config();
const mongoose =  require("mongoose");

function connectDb()
{
    mongoose.connect(process.env.MONGO_CONNECTION_URL, {useNewUrlParser: true,useCreateIndex:true, useFindAndModify:true, useUnifiedTopology: true});

    const connect = mongoose.connection;
    connect.once('open', function () {
      console.log('MongoDB running');
    }).catch(err=> {console.log(err)});
}
module.exports=connectDb;