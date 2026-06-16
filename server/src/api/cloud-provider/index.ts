import { Router } from "express";
import { CloudProviderController } from "./cloud-provider.controller";

const router = Router();

router.get("/", CloudProviderController.getCloudProviders);

export default router;
