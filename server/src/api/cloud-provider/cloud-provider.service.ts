import { CloudProviderDto } from '../../../../common/dtos/cloud-provider.dto';
import { CloudProviderRepository } from './cloud-provider.repository';
import { CloudProvider } from './types';

export class CloudProviderService {
  static async getCloudProviders(): Promise<CloudProviderDto[]> {
    const cloudProviders = await CloudProviderRepository.findAll();

    return cloudProviders.map(this.buildCloudProviderDto);
  }

  private static buildCloudProviderDto(
    cloudProvider: CloudProvider
  ): CloudProviderDto {
    return {
      id: cloudProvider.id,
      displayName: cloudProvider.name,
    };
  }
}
