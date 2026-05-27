export interface MockUser {
  fullName: string;
  farmName: string;
  phone: string;
}

export interface RegisterInput extends MockUser {
  password: string;
}
