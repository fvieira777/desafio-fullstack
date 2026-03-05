import { useEffect, useMemo, useState } from "react";
import { UsersService } from "../api/users.service";
import { UserCreateRequest, UserResponse, UserUpdateRequest } from "../types/user";
import { UserForm } from "../components/UserForm";
import { UserTable } from "../components/UserTable";
import { ToastItem, Toasts } from "../components/Toast";

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export function UsersPage() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [editing, setEditing] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  function pushToast(t: Omit<ToastItem, "id">) {
    setToasts((p) => [{ ...t, id: uid() }, ...p].slice(0, 3));
  }

  async function reload() {
    setLoading(true);
    try {
      const data = await UsersService.list();
      setUsers(data);
    } catch (e: any) {
      pushToast({ type: "error", title: "No se pudo cargar", message: e?.message ?? "Error consultando API" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { reload(); }, []);

  async function onCreate(payload: UserCreateRequest) {
    try {
      await UsersService.create(payload);
      pushToast({ type: "success", title: "Usuario creado", message: "El registro fue guardado correctamente." });
      await reload();
    } catch (e: any) {
      pushToast({ type: "error", title: "Error al crear", message: e?.message ?? "Revisa los datos e intenta nuevamente" });
      throw e;
    }
  }

  async function onUpdate(id: number, payload: UserUpdateRequest) {
    try {
      await UsersService.update(id, payload);
      setEditing(null);
      pushToast({ type: "success", title: "Cambios guardados", message: `Usuario #${id} actualizado.` });
      await reload();
    } catch (e: any) {
      pushToast({ type: "error", title: "Error al actualizar", message: e?.message ?? "No fue posible guardar cambios" });
      throw e;
    }
  }

  async function onDelete(id: number) {
    try {
      await UsersService.remove(id);
      pushToast({ type: "success", title: "Usuario eliminado", message: `Usuario #${id} eliminado.` });
      await reload();
    } catch (e: any) {
      pushToast({ type: "error", title: "Error al eliminar", message: e?.message ?? "No fue posible eliminar" });
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => {
      const rut = `${u.rut}-${u.dv}`.toLowerCase();
      return (
        u.nombres.toLowerCase().includes(q) ||
        u.apellidos.toLowerCase().includes(q) ||
        u.correoElectronico.toLowerCase().includes(q) ||
        rut.includes(q)
      );
    });
  }, [users, query]);

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="brand">
            <div className="logo" aria-hidden="true" />
            <div>
              <h1 className="h1">Mantenedor de Usuarios</h1>
              <p className="sub">React + TypeScript (Vite) · API Spring Boot · H2 en memoria · OpenAPI/Swagger</p>
            </div>
          </div>

          <div className="kpis">
            <span className="kpi">Ambiente local</span>
            <span className="kpi">Usuarios: <b style={{ color: "var(--text)" }}>{users.length}</b></span>
            <span className="kpi">Estado: <b style={{ color: "var(--text)" }}>{loading ? "Cargando" : "OK"}</b></span>
          </div>
        </div>

        <div className="grid">
          <section className="card">
            <div className="cardHeader">
              <div>
                <h2 className="cardTitle">{editing ? `Editar usuario #${editing.id}` : "Crear usuario"}</h2>
                <p className="cardDesc">Completa los datos y guarda. La contraseña se solicita en creación y al editar.</p>
              </div>
              {editing && (
                <button className="btn" onClick={() => setEditing(null)} type="button">Cancelar edición</button>
              )}
            </div>
            <div className="cardBody">
              <UserForm
                key={editing?.id ?? "new"}
                mode={editing ? "edit" : "create"}
                initial={editing}
                onCancel={() => setEditing(null)}
                onCreate={onCreate}
                onUpdate={onUpdate}
              />
            </div>
          </section>

          <section className="card">
            <div className="cardHeader">
              <div>
                <h2 className="cardTitle">Búsqueda</h2>
                <p className="cardDesc">Filtra por nombre, apellido, correo o RUT.</p>
              </div>
              <span className="badge">{filtered.length} / {users.length}</span>
            </div>
            <div className="cardBody">
              <div className="field">
                <label>Buscar</label>
                <input
                  className="input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ej: fabian, perez, correo@dominio.cl, 12345678-9"
                />
              </div>
              <div style={{ marginTop: 14 }} className="small">
                Sugerencia: prueba con el RUT completo (ej. <b>12345678-9</b>).
              </div>
            </div>
          </section>
        </div>

        <div style={{ height: 16 }} />

        <section className="card">
          <div className="cardHeader">
            <div>
              <h2 className="cardTitle">Usuarios</h2>
              <p className="cardDesc">Listado con acciones de editar y eliminar.</p>
            </div>
            <button className="btn" onClick={reload} type="button" disabled={loading}>
              {loading ? "Actualizando..." : "Refrescar"}
            </button>
          </div>
          <div className="cardBody">
            <UserTable users={filtered} onEdit={(u) => setEditing(u)} onDelete={onDelete} loading={loading} />
          </div>
        </section>
      </div>

      <Toasts items={toasts} onDismiss={(id) => setToasts((p) => p.filter((x) => x.id !== id))} />
    </>
  );
}
