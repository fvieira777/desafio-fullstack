package cl.company.usersapi.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(
  name = "users",
  uniqueConstraints = {
    @UniqueConstraint(name = "uk_users_rut_dv", columnNames = {"rut", "dv"}),
    @UniqueConstraint(name = "uk_users_email", columnNames = {"correo_electronico"})
  }
)
public class UserEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String nombres;

  @Column(nullable = false)
  private String apellidos;

  @Column(nullable = false)
  private Long rut;

  @Column(nullable = false, length = 1)
  private String dv;

  @Column(name = "fecha_nacimiento", nullable = false)
  private LocalDate fechaNacimiento;

  @Column(name = "correo_electronico", nullable = false)
  private String correoElectronico;

  @Column(nullable = false)
  private String contrasena;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public String getNombres() { return nombres; }
  public void setNombres(String nombres) { this.nombres = nombres; }

  public String getApellidos() { return apellidos; }
  public void setApellidos(String apellidos) { this.apellidos = apellidos; }

  public Long getRut() { return rut; }
  public void setRut(Long rut) { this.rut = rut; }

  public String getDv() { return dv; }
  public void setDv(String dv) { this.dv = dv; }

  public LocalDate getFechaNacimiento() { return fechaNacimiento; }
  public void setFechaNacimiento(LocalDate fechaNacimiento) { this.fechaNacimiento = fechaNacimiento; }

  public String getCorreoElectronico() { return correoElectronico; }
  public void setCorreoElectronico(String correoElectronico) { this.correoElectronico = correoElectronico; }

  public String getContrasena() { return contrasena; }
  public void setContrasena(String contrasena) { this.contrasena = contrasena; }
}
