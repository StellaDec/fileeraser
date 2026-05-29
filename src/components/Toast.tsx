"use client";

// Lightweight toast notification component
import { useState, useCallback, useEffect, createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";

// Toast ke types — success ya error
interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

interface ToastContextType {
  showToast: (message: string, type: "success" | "error") => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

// Toast hook — kisi bhi component se toast trigger karo
export const useToast = () => useContext(ToastContext);

// Toast Provider — app ko wrap karo
export function ToastProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  // Auto-remove after 4 seconds
  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 4000);
    return () => clearTimeout(timer);
  }, [toasts]);

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {/* Toast container — fixed position bottom-right */}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-5 py-3 rounded-xl shadow-2xl text-white text-sm font-medium
              animate-[slideIn_0.3s_ease-out]
              ${
                toast.type === "success"
                  ? "bg-emerald-600"
                  : "bg-red-600"
              }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
