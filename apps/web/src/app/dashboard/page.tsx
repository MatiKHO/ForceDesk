"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { Sword, User, LogOut } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default function DashboardPage() {
  const { logout, user } = useAuth();
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-sky-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-muted-foreground">Bienvenido a ForceDesk, el gestor de incidencias que usa Yoda.</p>
            </div>
            
          </div>

          <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl border border-blue-200">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://github.com/shadcn.png" alt={user?.username || "Usuario"} />
              <AvatarFallback className="bg-gradient-to-r from-blue-400 to-sky-500 text-white">
                {user?.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold text-blue-700">¡Hola, {user?.username}!</h2>
              <p className="text-muted-foreground">¿Qué bugs encontraremos hoy?</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={() => router.push("/dashboard/bugs")}
              className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-blue-400 to-sky-500 hover:from-blue-500 hover:to-sky-600"
            >
              <Sword className="h-6 w-6" />
              <span>Gestionar Incidencias</span>
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => router.push("/dashboard/profile")}
              className="h-20 flex flex-col items-center justify-center gap-2 border-blue-200 hover:bg-blue-50 text-blue-600"
            >
              <User className="h-6 w-6" />
              <span>Mi Perfil</span>
            </Button>
          </div>

          <div className="flex justify-center pt-4">
            <Button 
              variant="ghost" 
              onClick={logout}
              className="flex items-center gap-2 text-blue-600 hover:bg-blue-50"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}