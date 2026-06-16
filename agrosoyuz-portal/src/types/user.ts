export interface MockUser {
  fullName: string;
  farmName: string;
  phone: string;
  farmSize: string;
  crops: string;
  activity: string;
  sownArea: string;
  demandedServices: string;
}

export interface RegisterInput {
  fullName: string;
  farmName: string;
  phone: string;
  password: string;
}
