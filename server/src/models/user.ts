import mongoose, { Schema, Document } from "mongoose";
import { z } from "zod";
import bcrypt from "bcrypt";

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(10, "Password must be at least 10 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;

// Define an interface representing a document in MongoDB.
interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema: Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving the user document
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

export const User = mongoose.model<IUser>("User", userSchema);
