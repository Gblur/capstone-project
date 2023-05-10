import mongoose from "mongoose";

const {Schema} = mongoose;

const UserSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  role: {type: String, required: false, default: "Admin"},
  priviledges: {
    type: Array,
    default: ["maps.read", "maps.write", "maps.update", "maps.delete"],
  },
  team: {type: String, required: false},
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
