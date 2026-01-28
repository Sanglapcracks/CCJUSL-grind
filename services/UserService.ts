"use server";
import { prisma } from "@/prisma/client";
import { getUserByEmail } from "./AuthService";
import ShortUniqueId from "short-unique-id";
import { sendPasswordResetEmail, sendVerificationEmail } from "./EmailService";
import bcrypt from "bcryptjs";

const FRONTEND_URL = process.env.FRONTEND_URL;

type RegistrationData = {
  phone: string;
  college: string;
  year: string;
  department: string;
};

const completeUserRegistration = async (data: RegistrationData, id: string) => {
  const status = await prisma.user.update({
    where: {
      id,
    },
    data: {
      phone: data.phone,
      year: data.year,
      college: data.college,
      department: data.department,
      registrationComplete: true
    },
  });
  return { ok: true, message: "Registration completed" };
};

const setVerificationCode = async (email: string, token: string) => {
  const status = await prisma.user.update({
    where: { email },
    data: { verificationToken: token },
  });
  return { ok: true, message: "Token set" };
};

const matchVerificationCode = async (email: string, code: string) => {
  const userToken = await prisma.user.findFirst({
    where: { email },
    select: { verificationToken: true },
  });
  const match = userToken?.verificationToken === code;

  const verifiedAt = new Date();
  if (match)
    await prisma.user.update({
      where: { email },
      data: { emailVerified: verifiedAt },
    });
  return match;
};

const verifyEmail = async (email: string) => {
  const token = new ShortUniqueId({ length: 8 }).rnd();
  await prisma.user.update({
    where: { email },
    data: { verificationToken: token },
  });

  const result = await sendVerificationEmail(email, token);
  return result;
};

const handleForgotPassword = async (email: string) => {
  const existingUser = await getUserByEmail(email);
  if (!existingUser) return { ok: false, message: "Error occurred" };

  const token = new ShortUniqueId({ length: 20 }).rnd();
  const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000);
  await prisma.resetPasswordToken.create({
    data: {
      user_id: existingUser.id,
      token,
      expiresAt: tokenExpiry,
    },
  });
  const link = `${FRONTEND_URL}/reset-password?token=${token}`;

  const res = await sendPasswordResetEmail(email, link);

  return res;
};

const verifyPasswordResetToken = async (token: string | null) => {
  if (!token) return { ok: false, id: null };
  const resetToken = await prisma.resetPasswordToken.findFirst({
    where: { token },
  });
  const currentDate = new Date();
  if (!resetToken || !resetToken.user_id) return { ok: false, id: null };
  const tokenValid = resetToken?.expiresAt > currentDate;
  if(!tokenValid) return {ok: false, id: null};

  return { ok: true, id: resetToken.user_id };
};

const resetPassword = async (userId: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 12);  
  const status = await prisma.user.update({where: {
        id: userId
    }, data: {
        password: hashedPassword
    }});
    return {ok: true, status};
}

export {
  completeUserRegistration,
  setVerificationCode,
  matchVerificationCode,
  verifyEmail,
  handleForgotPassword,
  verifyPasswordResetToken,
  resetPassword
};
