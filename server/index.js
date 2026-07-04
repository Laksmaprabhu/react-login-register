import dotenv from 'dotenv';
import app from "./App.js";
import ConnectDB from "./config/db.js";


const startServer = async() => {
    try{
        dotenv.config();
        await ConnectDB();
        app.listen(5000, () => {
            console.log('server running');
        })
    }
    catch(err){
        console.log(err);
    }  
}

startServer();