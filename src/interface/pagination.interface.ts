export interface Pagination<T> {
    data: Array<T>;
    meta: {
      total: number;
      offset: number;
      limit: number;
    };
  }
  
  export interface PaginationFilter {
    query?: string;
    limit?: number;
    offset?: number;
  }
  