import type { ReactNode } from "react";
import "./admin.css";

interface AdminShellProps {
  subtitle: string;
  actions: ReactNode;
  children: ReactNode;
}

export default function AdminShell({
  subtitle,
  actions,
  children,
}: AdminShellProps) {
  return (
    <div className="admin-app">
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-brand">
            <img
              src="/Panoramics-transparent-cropped.png"
              alt="Panoramics - A Vision Logo"
            />
            <div>
              <h1>Admin Dashboard</h1>
              <p>{subtitle}</p>
            </div>
          </div>
          <div className="admin-actions">{actions}</div>
        </div>
      </header>

      <div className="admin-main">{children}</div>
    </div>
  );
}

export function adminNavLinkClass() {
  return "admin-btn";
}

export function adminLogoutClass() {
  return "admin-btn admin-btn-logout";
}

export function AdminLoading({ label }: { label: string }) {
  return (
    <div className="admin-app admin-center">
      <div>
        <div className="admin-spinner" />
        <p>{label}</p>
      </div>
    </div>
  );
}
