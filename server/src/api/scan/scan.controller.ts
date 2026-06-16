import { Request, Response } from 'express';
import { ScanService } from './scan.service';

export class ScanController {
  static async getScans(req: Request, res: Response) {
    const scans = await ScanService.getScans(req.query);

    return res.send(scans);
  }
}
