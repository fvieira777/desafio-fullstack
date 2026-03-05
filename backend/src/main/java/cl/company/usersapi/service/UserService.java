package cl.company.usersapi.service;

import cl.company.usersapi.dto.UserCreateRequest;
import cl.company.usersapi.dto.UserResponse;
import cl.company.usersapi.dto.UserUpdateRequest;

import java.util.List;

public interface UserService {
  UserResponse create(UserCreateRequest req);
  List<UserResponse> findAll();
  UserResponse findById(Long id);
  UserResponse update(Long id, UserUpdateRequest req);
  void delete(Long id);
}
