import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors/customError.js";
import { signUpSchema, TSignUpSchema, User } from "../models/user.js"; // Import signUpSchema from your user model file

export type RegisterResponse = {
  success: boolean;
  message: string;
};

export const register = async (
  req: Request<{}, {}, TSignUpSchema>,
  res: Response<RegisterResponse>,
  next: NextFunction
) => {
  const { email, password, confirmPassword } = req.body;

  const validation = signUpSchema.safeParse({
    email,
    password,
    confirmPassword,
  });

  if (!validation.success) {
    throw new BadRequestError(
      validation.error.errors.map((err) => err.message).join(", ")
    );
  }

  await User.create({ email, password });

  res.json({
    success: true,
    message: "user created successfully",
  });
};
