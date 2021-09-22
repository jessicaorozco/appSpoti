import { Router, } from "express";
import { getToken } from "../../spoti/application_business_rules/useCaseSpoti";
const router = Router();


router.route("/spoti",)
	.get(getToken);
	// .post(createUser,);


// router.route("/spoti/:id")
	// .put(updateUser,)
	// .get(getUser,)
	// .delete(deleteUser,)
	// .put(updateUser,);


export default router;