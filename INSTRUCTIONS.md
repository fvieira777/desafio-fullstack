# Instrucciones de Ejecución — Desafío Fullstack

Este repositorio contiene:
- Backend: Java 17 + Spring Boot + H2 (in-memory) + JPA + OpenAPI
- Frontend: React + TypeScript (Vite) servido por Nginx
- Orquestación: Docker Compose

## Requisitos
- Docker Desktop o Docker Engine
- Docker Compose (v2)

## Ejecución con Docker Compose
Desde la raíz del repositorio:

##bash

Detener servicios
docker compose down --remove-orphans
docker compose down --remove-orphans
Prueba rápida vía curl

Crear usuario:

curl -X POST http://localhost:8080/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "nombres":"Juan",
    "apellidos":"Perez",
    "rut":12345678,
    "dv":"9",
    "fechaNacimiento":"1990-01-01",
    "correoElectronico":"juan.perez@email.com",
    "contrasena":"Secret123"
  }'

Listar usuarios:

curl http://localhost:8080/api/v1/users

---

## 2) openapi.yaml (dónde va)
Debe ir en la **raíz** del repo con el nombre exacto:

```text
openapi.yaml


# INSTRUCTIONS

Este repositorio contiene:
- `backend/` Spring Boot 3.4.x + Java 17 + H2 (memoria) + JPA + Swagger UI (springdoc)
- `frontend/` React + TypeScript (Vite) servido con Nginx y proxy a backend
- `docker-compose.yml` para levantar todo sin IDE

---

## Requisitos
- Docker + Docker Compose (plugin)

---

## 1) Levantar con Docker Compose

Desde la raíz del repo:

```bash
docker compose up --build
```

Servicios:
- Frontend (Nginx): http://localhost:8081
- Backend: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui
- OpenAPI JSON: http://localhost:8080/api-docs
- H2 Console: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:usersdb`
  - User: `sa`
  - Password: (vacío)

> El frontend usa un proxy Nginx: todo lo que empiece con `/api` se envía al backend.

Para detener:

```bash
docker compose down
```

---

## 2) Probar API por terminal (cURL)

Crear usuario:

```bash
curl -X POST http://localhost:8080/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "nombres":"Juan",
    "apellidos":"Perez",
    "rut":12345678,
    "dv":"9",
    "fechaNacimiento":"1990-01-01",
    "correoElectronico":"juan.perez@mail.com",
    "contrasena":"Secret123"
  }'
```

Listar:

```bash
curl http://localhost:8080/api/v1/users
```

---

## 3) Desarrollo local (sin Docker) — opcional

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

En modo dev, la API base es `http://localhost:8080`.
