import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/services/mongo";
import { userModel } from "@/app/models/user-model";
export const POST = async (request) => {
  const { fname, lname, email, password } = await request.json();
  await dbConnect();
  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = {
    name: `${fname} ${lname},`,
    email,
    password: hashedPassword,
  };

  try {
    await userModel.create(newUser);
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};

export default POST;
