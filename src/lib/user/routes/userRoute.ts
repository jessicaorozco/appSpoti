import { Router, } from "express";
import { getUser, createUser, getList, deleteUser, updateUser, loginUser, } from "../application_business_rules/useCaseUser";
const router = Router();


router.route("/user",)
	.get(getList,)
	.post(createUser,);


router.route("/user/:id",)
	.put(updateUser,)
	.get(getUser,)
	.delete(deleteUser,)
	.put(updateUser,);

router.route("/login",)
	.post(loginUser,);
  

export default router;