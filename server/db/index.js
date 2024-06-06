import mongoose from 'mongoose'

async function MongoDB(){
    try {

        await mongoose.connect('mongodb+srv://hemnarayanyadav030:hem123@multer.t9bdpju.mongodb.net/?retryWrites=true&w=majority&appName=multer')
        console.log("MongoDB connected Succeefully !!");

        
    } catch (error) {
        console.log('MongoDB connection error', error);
        
    }
}

export default MongoDB;