export interface Filters {
  startDate?: string;
  endDate?: string;
  cloudProvidersIds?: string[];
}

export interface FindAllParams {
  filterCallback?: (scan: Scan) => boolean;
}

export interface Scan {
  id: string;
  date: Date;
  cloudProviderId: string;
  scanSize: number;
  scanPrivateKey: string;
}
