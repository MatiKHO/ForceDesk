"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"


export default function DashboardPage() {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className="p-8 space-y-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={() => router.push("/dashboard/bugs")}>Ver incidencias</Button>
        <Button onClick={logout} className="mt-4">Cerrar sesión</Button>
      </div>
    </ProtectedRoute>
  );
}