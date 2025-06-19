'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/context/AuthContext";
import { Spinner } from "./ui/spinner";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (!loading && !user) {
        router.push("/login");
      }
    }, [user, loading, router]);
  
    if (loading || !user) {
      return (
        <div className="flex justify-center items-center h-40">
            <Spinner size="large" />
        </div>
      )
    }
  
    return <>{children}</>;
  }