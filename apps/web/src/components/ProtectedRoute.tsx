'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/context/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (!loading && !user) {
        router.push("/login");
      }
    }, [user, loading, router]);
  
    if (loading || !user) {
      return <div className="p-8">Cargando...</div>; // puedes poner un spinner
    }
  
    return <>{children}</>;
  }