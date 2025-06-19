import Button from "@/components/Button";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  const { logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={logout} label="Cerrar sesión" className="mt-4" />
      </div>
    </ProtectedRoute>
  );
}