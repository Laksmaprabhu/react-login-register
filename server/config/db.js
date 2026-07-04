import mongoose from 'mongoose';

const ConnectDB = async() => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(connection.connection.name);
    }
    catch(err){
        console.log(err);
    }
}

export default ConnectDB;