import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { connect } from "../../data/database";
import isPassword from "../enterprise_business_rules/iPassword";
import isEmail from "../enterprise_business_rules/isEmail";
import { User } from "../interface_adapters/iUser";

export async function getList(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const conn = await connect();
    const user = await conn.query("SELECT user_id, email FROM user");
    return res.json(user[0]);
  } catch (error) {
    console.error("estoy pasando el error" + error);
  }
}

export async function createUser(req: Request, res: Response) {
  const newUser: User = req.body;
  let emailValid = await isEmail(newUser.email);
  let passwordValid = await isPassword(newUser.password);
  console.log(emailValid);
  console.log(passwordValid);
  if (emailValid === true && passwordValid === true) {
    const conn = await connect();
    await conn.query("SELECT email FROM user WHERE user.email = ?", [
      newUser.email,
    ]);
      conn.query("INSERT INTO user SET ?", [newUser]);
      const payload = { check: true };
      const token = jwt.sign(payload, "access-token", {
        expiresIn: 1200000,
      });
      res.status(200).json({
        message: "Authorized, Welcome",
        token: token,
        expire: "Token expire in 20 minutes",
      });
    
   
  } else {
    res.status(400).json({
      emailValid,
      passwordValid,
    });
  }
}

export async function getUser(req: Request, res: Response) {
  const id = req.params.id;
  const conn = await connect();
  const user = await conn.query("SELECT * FROM user WHERE user.user_id = ?", [
    id,
  ]);
  res.json(user[0]);
}

export async function deleteUser(req: Request, res: Response) {
  const id = req.params.id;
  const conn = await connect();
  await conn.query("DELETE FROM user WHERE user.user_id = ?", [id]);
  res.json({
    message: "User deleted",
  });
}

export async function updateUser(req: Request, res: Response) {
  const id = req.params.id;
  const updateUser: User = req.body;
  const conn = await connect();
  await conn.query("UPDATE user set ? WHERE user.user_id = ?", [updateUser, id]);
  res.json({
    message: "User Updated",
  });
}

export async function loginUser(req: Request, res: Response) {
  const loginUser: User = req.body;
  let emailValid = await isEmail(loginUser.email);
  let passwordValid = await isPassword(loginUser.password);
  console.log(emailValid);
  console.log(passwordValid);
  if (emailValid === true && passwordValid === true) {
    const id = req.params.id;
    const conn = await connect();
    await conn.query("SELECT * FROM user WHERE user.user_id = ?", [id]);
    const payload = { check: true };
    const token = jwt.sign(payload, "access-token", {
      expiresIn: 1200000,
    });
    res.status(200).json({
      message: "Authorized, Welcome",
      token: token,
      expire: "Token expire in 20 minutes"
    });
  } else {
    res.status(400).json({
      emailValid,
      passwordValid,
    });
  }
}
