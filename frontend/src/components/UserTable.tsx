import { UserResponse } from "../types/user";

type Props = {
  users: UserResponse[];
  onEdit: (u: UserResponse) => void;
  onDelete: (id: number) => Promise<void>;
  loading?: boolean;
};

export function UserTable({ users, onEdit, onDelete, loading }: Props) {
  return (
    <div>
      <div className="toolbar">
        <div style={{ color: "var(--muted)" }}>
          {loading ? "Cargando datos..." : users.length === 0 ? "No hay resultados." : `Mostrando ${users.length} usuario(s)`}
        </div>
        <span className="badge">API: /api/api/v1/users</span>
      </div>

      <div className="tableWrap">
        <table className="table">
          <thead>
            <tr>
              {["ID", "Nombres", "Apellidos", "RUT", "Nacimiento", "Correo", "Acciones"].map((h) => (
                <th key={h} className="th">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="td">{u.id}</td>
                <td className="td">{u.nombres}</td>
                <td className="td">{u.apellidos}</td>
                <td className="td">{u.rut}-{u.dv}</td>
                <td className="td">{u.fechaNacimiento}</td>
                <td className="td">{u.correoElectronico}</td>
                <td className="td">
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button className="btn" onClick={() => onEdit(u)} type="button">Editar</button>
                    <button
                      className="btn btnDanger"
                      type="button"
                      onClick={() => {
                        if (confirm(`¿Eliminar usuario #${u.id}?`)) onDelete(u.id);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {!loading && users.length === 0 && (
              <tr>
                <td colSpan={7} className="td">
                  <div className="empty">
                    No hay usuarios para mostrar. Crea uno usando el formulario.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="small" style={{ marginTop: 10 }}>
        Nota: en pantallas pequeñas la tabla hace scroll horizontal.
      </div>
    </div>
  );
}
