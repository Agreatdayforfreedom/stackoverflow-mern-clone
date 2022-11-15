import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../interfaces/interfaces";

interface UserMethods {
  comparePassword(password: string): Promise<boolean>;
}

type UserModel = mongoose.Model<User, {}, UserMethods>;

const userSchema = new mongoose.Schema<User, UserModel, UserMethods>(
  {
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    reputation: { type: Number, default: 1 },
    avatar: {
      type: String,
      default: function () {
        return `https://secure.gravatar.com/avatar/${this._id}?s=90&d=identicon`;
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (): Promise<void> {
  const salt: string = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model<User, UserModel>("User", userSchema);
