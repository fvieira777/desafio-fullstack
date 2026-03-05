export type UserResponse = {
  id: number;
  nombres: string;
  apellidos: string;
  rut: number;
  dv: string;
  fechaNacimiento: string; // YYYY-MM-DD
  correoElectronico: string;
};

export type UserCreateRequest = {
  nombres: string;
  apellidos: string;
  rut: number;
  dv: string;
  fechaNacimiento: string;
  correoElectronico: string;
  contrasena: string;
};

export type UserUpdateRequest = UserCreateRequest;
