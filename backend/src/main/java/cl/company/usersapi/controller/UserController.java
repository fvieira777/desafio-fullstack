package cl.company.usersapi.controller;

import cl.company.usersapi.dto.UserCreateRequest;
import cl.company.usersapi.dto.UserResponse;
import cl.company.usersapi.dto.UserUpdateRequest;
import cl.company.usersapi.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

  private final UserService service;

  public UserController(UserService service) {
    this.service = service;
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public UserResponse create(@Valid @RequestBody UserCreateRequest req) {
    return service.create(req);
  }

  @GetMapping
  public List<UserResponse> list() {
    return service.findAll();
  }

  @GetMapping("/{id}")
  public UserResponse get(@PathVariable Long id) {
    return service.findById(id);
  }

  @PutMapping("/{id}")
  public UserResponse update(@PathVariable Long id, @Valid @RequestBody UserUpdateRequest req) {
    return service.update(id, req);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    service.delete(id);
  }
}
