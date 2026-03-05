package cl.company.usersapi.dto;

import java.time.LocalDate;

public record UserResponse(
  Long id,
  String nombres,
  String apellidos,
  Long rut,
  String dv,
  LocalDate fechaNacimiento,
  String correoElectronico
) {}
