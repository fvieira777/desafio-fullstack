package cl.company.usersapi.mapper;

import cl.company.usersapi.dto.UserCreateRequest;
import cl.company.usersapi.dto.UserResponse;
import cl.company.usersapi.dto.UserUpdateRequest;
import cl.company.usersapi.entity.UserEntity;

public final class UserMapper {
  private UserMapper() {}

  public static UserEntity toEntity(UserCreateRequest req) {
    UserEntity e = new UserEntity();
    e.setNombres(req.nombres());
    e.setApellidos(req.apellidos());
    e.setRut(req.rut());
    e.setDv(req.dv());
    e.setFechaNacimiento(req.fechaNacimiento());
    e.setCorreoElectronico(req.correoElectronico());
    e.setContrasena(req.contrasena());
    return e;
  }

  public static void apply(UserEntity e, UserUpdateRequest req) {
    e.setNombres(req.nombres());
    e.setApellidos(req.apellidos());
    e.setRut(req.rut());
    e.setDv(req.dv());
    e.setFechaNacimiento(req.fechaNacimiento());
    e.setCorreoElectronico(req.correoElectronico());
    e.setContrasena(req.contrasena());
  }

  public static UserResponse toResponse(UserEntity e) {
    return new UserResponse(
      e.getId(),
      e.getNombres(),
      e.getApellidos(),
      e.getRut(),
      e.getDv(),
      e.getFechaNacimiento(),
      e.getCorreoElectronico()
    );
  }
}
