"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useState } from "react";

type Props = {
  onFilterChange: (filters: { status?: string; assignment?: string }) => void;
};


export type BugFiltersState = {
  status?: "OPEN" | "CLOSED" | string;
  assignment?: "UNASSIGNED" | "ASSIGNED_TO_ME" | "ASSIGNED_TO_OTHERS" | string;
};


export default function BugFilters({ onFilterChange }: Props) {
  const [status, setStatus] = useState<string | undefined>();
  const [assignment, setAssignment] = useState<string | undefined>();

  const handleFilterChange = (key: 'status' | 'assignment', value: string | undefined) => {
    const newFilters = {
      status: key === 'status' ? value : status,
      assignment: key === 'assignment' ? value : assignment,
    };
    setStatus(newFilters.status);
    setAssignment(newFilters.assignment);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    setStatus(undefined);
    setAssignment(undefined);
    onFilterChange({});
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
      <Select value={status ?? ""} onValueChange={(val) => handleFilterChange('status', val)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="OPEN">Abierto</SelectItem>
          <SelectItem value="CLOSED">Cerrado</SelectItem>
        </SelectContent>
      </Select>

      <Select value={assignment ?? ""} onValueChange={(val) => handleFilterChange('assignment', val)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Asignación" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ASSIGNED_TO_ME">Asignados a mí</SelectItem>
          <SelectItem value="ASSIGNED_TO_OTHERS">Asignados a otros</SelectItem>
          <SelectItem value="UNASSIGNED">Sin asignar</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={resetFilters}>
        Limpiar filtros
      </Button>
    </div>
  );
}

