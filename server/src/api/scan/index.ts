import { Router } from "express";
import { ScanController } from "./scan.controller";
import { randomErrorMiddleware } from "../../middlewares";

const router = Router();

router.use(randomErrorMiddleware);

router.get("/", ScanController.getScans);

export default router;
