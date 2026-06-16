import { Router } from "express";
import cloudProviderRouter from "./cloud-provider";
import scanRouter from "./scan";

const router = Router();

router.use("/scans", scanRouter);
router.use("/cloud-providers", cloudProviderRouter);

export default router;
