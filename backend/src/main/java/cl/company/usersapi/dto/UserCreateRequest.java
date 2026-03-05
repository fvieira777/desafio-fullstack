package cl.company.usersapi.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public record UserCreateRequest(
  @NotBlank String nombres,
  @NotBlank String apellidos,
  @NotNull @Positive Long rut,
  @NotBlank @Size(min = 1, max = 1) String dv,
  @NotNull @Past LocalDate fechaNacimiento,
  @NotBlank @Email String correoElectronico,
  @NotBlank @Size(min = 6, max = 100) String contrasena
) {}
