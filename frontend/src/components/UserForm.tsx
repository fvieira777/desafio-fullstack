import { useMemo, useState } from "react";
import { UserCreateRequest, UserResponse, UserUpdateRequest } from "../types/user";

type Props = {
  mode: "create" | "edit";
  initial: UserResponse | null;
  onCancel: () => void;
  onCreate: (payload: UserCreateRequest) => Promise<void>;
  onUpdate: (id: number, payload: UserUpdateRequest) => Promise<void>;
};

const emptyForm: UserCreateRequest = {
  nombres: "",
  apellidos: "",
  rut: 0,
  dv: "",
  fechaNacimiento: "",
  correoElectronico: "",
  contrasena: ""
};

function normalizeDv(v: string) {
  const s = (v ?? "").trim().toUpperCase();
  if (!s) return "";
  const c = s[0];
  if (!/[0-9K]/.test(c)) return "";
  return c;
}

export function UserForm({ mode, initial, onCancel, onCreate, onUpdate }: Props) {
  const initialForm = useMemo<UserCreateRequest>(() => {
    if (!initial) return emptyForm;
    return {
      nombres: initial.nombres,
      apellidos: initial.apellidos,
      rut: initial.rut,
      dv: initial.dv,
      fechaNacimiento: initial.fechaNacimiento,
      correoElectronico: initial.correoElectronico,
      contrasena: ""
    };
  }, [initial]);

  const [form, setForm] = useState<UserCreateRequest>(initialForm);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof UserCreateRequest>(key: K, value: UserCreateRequest[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function validate(): string | null {
    if (!form.nombres.trim()) return "Nombres es requerido.";
    if (!form.apellidos.trim()) return "Apellidos es requerido.";
    if (!form.rut || form.rut <= 0) return "RUT debe ser mayor a 0.";
    if (!form.dv) return "DV es requerido (0-9 o K).";
    if (!form.fechaNacimiento) return "Fecha de nacimiento es requerida.";
    if (!form.correoElectronico.trim()) return "Correo electrónico es requerido.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.correoElectronico.trim())) return "Correo electrónico inválido.";
    if (!form.contrasena || form.contrasena.length < 6) return "Contraseña debe tener al menos 6 caracteres.";
    return null;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setBusy(true);
    try {
      if (mode === "create") {
        await onCreate(form);
        setForm(emptyForm);
      } else {
        await onUpdate(initial!.id, form);
      }
    } catch (err: any) {
      setError(err?.message ?? "Error");
      throw err;
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit}>
      {error && (
        <div className="card" style={{ padding: 12, marginBottom: 12, borderColor: "rgba(239,68,68,.35)" }}>
          <b>Revisa el formulario</b>
          <div className="small" style={{ marginTop: 6 }}>{error}</div>
        </div>
      )}

      <div className="formGrid">
        <div className="field">
          <label>Nombres</label>
          <input className="input" value={form.nombres} onChange={(e) => set("nombres", e.target.value)} placeholder="Ej: Fabián" required />
        </div>

        <div className="field">
          <label>Apellidos</label>
          <input className="input" value={form.apellidos} onChange={(e) => set("apellidos", e.target.value)} placeholder="Ej: Vieira Villarroel" required />
        </div>

        <div className="field">
          <label>RUT</label>
          <input className="input" type="number" value={form.rut || ""} onChange={(e) => set("rut", Number(e.target.value))} placeholder="Ej: 17752806" required />
        </div>

        <div className="field">
          <label>DV</label>
          <input className="input" value={form.dv} onChange={(e) => set("dv", normalizeDv(e.target.value))} placeholder="0-9 o K" required maxLength={1} />
        </div>

        <div className="field">
          <label>Fecha de nacimiento</label>
          <input className="input" type="date" value={form.fechaNacimiento} onChange={(e) => set("fechaNacimiento", e.target.value)} required />
        </div>

        <div className="field">
          <label>Correo electrónico</label>
          <input className="input" type="email" value={form.correoElectronico} onChange={(e) => set("correoElectronico", e.target.value)} placeholder="nombre@dominio.cl" required />
        </div>

        <div className="field" style={{ gridColumn: "1 / -1" }}>
          <label>Contraseña {mode === "edit" ? "(nueva contraseña)" : ""}</label>
          <input className="input" type="password" value={form.contrasena} onChange={(e) => set("contrasena", e.target.value)} placeholder="mín. 6 caracteres" required minLength={6} />
        </div>
      </div>

      <div className="actions">
        <button className="btn btnPrimary" type="submit" disabled={busy}>
          {busy ? "Guardando..." : mode === "create" ? "Crear usuario" : "Guardar cambios"}
        </button>

        {mode === "edit" && (
          <button className="btn" type="button" onClick={onCancel} disabled={busy}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
