export type FindVehiclesReturn<A> = {
  data: A;
  paging: { limit: number; offset: number; total: number };
};

export type Paging = { limit: number; offset: number; total: number };
