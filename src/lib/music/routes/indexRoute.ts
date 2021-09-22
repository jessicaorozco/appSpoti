import { Router } from "express";
// import { indexWelcome, } from '../enterprise_business_rules/useCaseIndex';
import { getPlayList } from "../../music/application_business_rules/useCaseMusic";
import { createCategory } from "../application_business_rules/useCaseMusic";

const router = Router();

router.route("/").get(getPlayList).post(createCategory);

export default router;
