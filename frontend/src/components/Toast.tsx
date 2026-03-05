import { useEffect } from "react";

export type ToastType = "success" | "error" | "info";

export type ToastItem = {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  ttlMs?: number;
};

type Props = {
  items: ToastItem[];
  onDismiss: (id: string) => void;
};

export function Toasts({ items, onDismiss }: Props) {
  useEffect(() => {
    const timers = items.map((t) => {
      const ttl = t.ttlMs ?? 2600;
      return setTimeout(() => onDismiss(t.id), ttl);
    });
    return () => timers.forEach(clearTimeout);
  }, [items, onDismiss]);

  if (items.length === 0) return null;

  return (
    <div className="toastWrap" role="status" aria-live="polite">
      {items.map((t) => (
        <div
          key={t.id}
          className={`toast ${t.type === "success" ? "toastOk" : t.type === "error" ? "toastErr" : ""}`}
          onClick={() => onDismiss(t.id)}
          title="Click para cerrar"
          style={{ cursor: "pointer" }}
        >
          <p className="toastTitle">{t.title}</p>
          {t.message && <p className="toastMsg">{t.message}</p>}
          <div className="small" style={{ marginTop: 8 }}>Tip: click para cerrar</div>
        </div>
      ))}
    </div>
  );
}
