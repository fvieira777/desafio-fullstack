package cl.company.usersapi.service;

import cl.company.usersapi.dto.UserCreateRequest;
import cl.company.usersapi.dto.UserResponse;
import cl.company.usersapi.dto.UserUpdateRequest;
import cl.company.usersapi.entity.UserEntity;
import cl.company.usersapi.exception.NotFoundException;
import cl.company.usersapi.mapper.UserMapper;
import cl.company.usersapi.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

  private final UserRepository repo;

  public UserServiceImpl(UserRepository repo) {
    this.repo = repo;
  }

  @Override
  public UserResponse create(UserCreateRequest req) {
    UserEntity saved = repo.save(UserMapper.toEntity(req));
    return UserMapper.toResponse(saved);
  }

  @Override
  @Transactional(readOnly = true)
  public List<UserResponse> findAll() {
    return repo.findAll().stream().map(UserMapper::toResponse).toList();
  }

  @Override
  @Transactional(readOnly = true)
  public UserResponse findById(Long id) {
    UserEntity entity = repo.findById(id)
      .orElseThrow(() -> new NotFoundException("User not found: id=" + id));
    return UserMapper.toResponse(entity);
  }

  @Override
  public UserResponse update(Long id, UserUpdateRequest req) {
    UserEntity entity = repo.findById(id)
      .orElseThrow(() -> new NotFoundException("User not found: id=" + id));
    UserMapper.apply(entity, req);
    UserEntity saved = repo.save(entity);
    return UserMapper.toResponse(saved);
  }

  @Override
  public void delete(Long id) {
    if (!repo.existsById(id)) throw new NotFoundException("User not found: id=" + id);
    repo.deleteById(id);
  }
}
