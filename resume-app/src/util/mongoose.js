import {connect,connection} from 'mongoose';

const conn ={
    isConnected:false
}

export async function dbConncet(){
    if(conn.isConnected) return;
    const db = await connect(process.env.MONGODB_URL,{useNewUrlParser: true, useUnifiedTopology: true});
    conn.isConnected = db.connections[0].readyState;
    console.log(db.connection.db.databaseName)
}

connection.on("connected",()=>{
    console.log("mongodb connected to our database")
})

connection.on("error",()=>{
    console.log("Mongodb error",err.message)
})