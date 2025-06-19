"use client";

import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Home, User } from "lucide-react";
import BugFilters, { BugFiltersState } from "@/components/BugFilters";
import BugTable from "@/components/BugTable";
import BugForm from "@/components/BugForm";

export default function BugsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [filters, setFilters] = useState<BugFiltersState>({});
  const [refreshFlag, setRefreshFlag] = useState(false);
  const refreshTable = () => setRefreshFlag(!refreshFlag);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 flex justify-center items-center">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-sky-600 bg-clip-text text-transparent">
              Bugs de la fuerza
            </h1>
            <p className="text-muted-foreground">Encuentra los bugs y que la fuerza te acompañe</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 border-blue-200 hover:bg-blue-50 text-blue-600"
            >
              <Home className="h-4 w-4" />
              Inicio
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/dashboard/profile")}
              className="flex items-center gap-2 border-blue-200 hover:bg-blue-50 text-blue-600"
            >
              <User className="h-4 w-4" />
              Perfil
            </Button>
          </div>
        </div>
        
        <BugForm onCreated={refreshTable} />
        <BugFilters onFilterChange={setFilters} />
        <BugTable filters={filters} currentUserId={user.id} refreshFlag={refreshFlag} />
      </div>
    </div>
  );
}
