import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
   image : String 
});

const User = mongoose.model("User", userSchema);
export default User;