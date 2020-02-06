export interface ServerOptions {
  pageNumber: number;
  pageSize: number;
  filterOptions: any;
  sortOptions: any;
}

export function convertUTCDate(date: Date): Date {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()));
}

export function getServerOptions(pageNumber = 1, pageSize = 15, filterOptions = {}, sortOptions = {}): ServerOptions  {
  return {pageNumber: pageNumber, pageSize: pageSize, filterOptions: filterOptions, sortOptions: sortOptions};
}
