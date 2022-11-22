import mongoose from 'mongoose';

var db = "mongodb://127.0.0.1:27017"; 
async function mongooseConnect() {
    console.log('mongoose connections process...')
    try {
        const connect = await mongoose.connect(db,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Connection successful !!!', connect.STATES)

    } catch (error) {
        console.log('Connection failed: ', error)
    }
}


export default mongooseConnect;