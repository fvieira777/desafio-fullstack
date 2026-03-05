package cl.company.usersapi.repository;

import cl.company.usersapi.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
  boolean existsByCorreoElectronicoIgnoreCase(String correoElectronico);
  boolean existsByRutAndDv(Long rut, String dv);
}
