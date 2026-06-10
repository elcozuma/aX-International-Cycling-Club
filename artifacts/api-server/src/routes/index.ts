import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import analyticsRouter from "./analytics";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(analyticsRouter);
router.use(adminRouter);

export default router;
