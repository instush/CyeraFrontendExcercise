import { ScanDto } from '../../../../common/dtos/scan.dto';
import { ScanRepository } from './scan.repository';
import { Filters, Scan } from './types';

export class ScanService {
  static async getScans(params: Filters): Promise<ScanDto[]> {
    const { startDate, endDate, cloudProvidersIds } = params || {};

    const filterCallback = (scan: Scan) => {
      const startDateFilter = startDate
        ? scan.date.getTime() >= new Date(startDate).getTime()
        : true;

      const endDateFilter = endDate
        ? scan.date.getTime() < new Date(endDate).getTime()
        : true;

      const cloudProviderUidsFilter = cloudProvidersIds
        ? cloudProvidersIds.includes(scan.cloudProviderId)
        : true;

      return startDateFilter && endDateFilter && cloudProviderUidsFilter;
    };

    const scans = await ScanRepository.findAll({ filterCallback });

    return scans.map(this.buildScanDto);
  }

  private static buildScanDto(scan: Scan): ScanDto {
    return {
      date: scan.date.toISOString(),
      cloudProviderId: scan.cloudProviderId,
    };
  }
}
