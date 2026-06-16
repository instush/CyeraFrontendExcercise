import { Request, Response } from "express";
import { CloudProviderService } from "./cloud-provider.service";

export class CloudProviderController {
  static async getCloudProviders(_req: Request, res: Response) {
    const cloudProviders = await CloudProviderService.getCloudProviders();

    res.send(cloudProviders);
  }
}
