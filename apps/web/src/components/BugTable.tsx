"use client";

import { useEffect, useState } from "react";
import api from "../../lib/axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BugFiltersState } from "./BugFilters";

interface Bug {
  id: number;
  title: string;
  status: string;
  priority: string;
  createdAt: string;
  user?: {
    id: number;
    username: string;
  } | null;
}

interface Props {
  filters: BugFiltersState;
  currentUserId: number;
  refreshFlag: boolean;
}

export default function BugTable({
  filters,
  currentUserId,
  refreshFlag,
}: Props) {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(5);
  const [users, setUsers] = useState<{ id: number; username: string }[]>([]);

  const fetchBugs = async () => {
    const token = localStorage.getItem("token");
    const res = await api.get("/bugs", {
      params: { page, limit, ...filters },
      headers: { Authorization: `Bearer ${token}` },
    });

    setBugs(res.data.bugs);
    setTotalPages(res.data.totalPages);
  };

  const handleToggleStatus = async (bugId: number, status: string) => {
    const token = localStorage.getItem("token");
    await api.patch(
      `/bugs/${bugId}/status`,
      { status: status === "OPEN" ? "CLOSED" : "OPEN" },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchBugs();
  };

  const handleToggleAssignment = async (
    bugId: number,
    assignedTo: number | null
  ) => {
    try {
      await api.patch(
        `/bugs/${bugId}/assign`,
        { userId: assignedTo }
      );
      await fetchBugs();
    } catch (error: any) {
      console.error('Error al asignar la tarea:', error);
      const errorMessage = error.response?.data?.message || 'Error al asignar la tarea';
      alert(errorMessage);
    }
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    const res = await api.get("/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(res.data);
  };

  useEffect(() => {
    fetchBugs();
    fetchUsers();
  }, [filters, page, refreshFlag]);

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Asignado a</TableHead>
            <TableHead>Prioridad</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bugs.map((bug) => (
            <TableRow key={bug.id}>
              <TableCell>
                {new Date(bug.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{bug.title}</TableCell>
              <TableCell>
                <Badge variant={bug.status === "OPEN" ? "outline" : "default"}>
                  {bug.status}
                </Badge>
              </TableCell>
              <TableCell>
                <select
                  className="border rounded px-2 py-1 text-sm"
                  value={bug.user?.id ?? ""}
                  onChange={(e) => {
                    const selectedId =
                      e.target.value === "" ? null : Number(e.target.value);
                    handleToggleAssignment(bug.id, selectedId);
                  }}
                >
                  <option value="">Sin asignar</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                      {user.id === currentUserId ? " (yo)" : ""}
                    </option>
                  ))}
                </select>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    bug.priority === "HIGH"
                      ? "destructive"
                      : bug.priority === "MEDIUM"
                        ? "default"
                        : "secondary"
                  }
                >
                  {bug.priority}
                </Badge>
              </TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleStatus(bug.id, bug.status)}
                >
                  {bug.status === "OPEN" ? "Cerrar" : "Abrir"}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    // Asegurar que la comparación sea numérica
                    const currentUserIdNum = Number(currentUserId);
                    const bugUserIdNum = bug.user?.id ? Number(bug.user.id) : null;
                    
                    if (bugUserIdNum === currentUserIdNum) {
                      handleToggleAssignment(bug.id, null);
                    } else {
                      handleToggleAssignment(bug.id, currentUserIdNum);
                    }
                  }}
                >
                  {bug.user ? (
                    Number(bug.user.id) === Number(currentUserId) ? "Desasignar" : "Asignarme"
                  ) : (
                    "Asignarme"
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </Button>
        <span className="text-sm text-muted-foreground">
          Página {page} de {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
