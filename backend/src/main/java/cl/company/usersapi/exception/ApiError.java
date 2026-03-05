package cl.company.usersapi.exception;

public record ApiError(String timestamp, int status, String code, String message) {}
