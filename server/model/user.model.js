import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    }
});

const User = mongoose.model("User", userSchema);
export default User;