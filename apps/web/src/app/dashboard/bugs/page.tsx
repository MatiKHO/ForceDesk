"use client";

import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";
import BugFilters, { BugFiltersState } from "@/components/BugFilters";
import BugTable from "@/components/BugTable";
import BugForm from "@/components/BugForm";



export default function BugsPage() {
  const { user } = useAuth();
  const [filters, setFilters] = useState<BugFiltersState>({});
  const [refreshFlag, setRefreshFlag] = useState(false);
const refreshTable = () => setRefreshFlag(!refreshFlag);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Incidencias</h1>
        <p className="text-muted-foreground">Filtra y gestiona los bugs creados.</p>
      </div>
      
      <BugFilters onFilterChange={setFilters} />
      <BugForm onCreated={refreshTable} />
      <BugTable filters={filters} currentUserId={user.id} refreshFlag={refreshFlag} />
    </div>
  );
}
