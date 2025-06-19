"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import api from "../../lib/axios";
import { toast } from "sonner";

type BugPriority = "HIGH" | "MEDIUM" | "LOW";


interface Props {
  onCreated: () => void;
}

export default function BugForm({ onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<BugPriority>("MEDIUM");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/bugs",
        { title, priority },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Bug creado correctamente");
      setTitle("");
      setPriority("MEDIUM");
      onCreated(); // Recarga la tabla
    } catch (err) {
      toast.error("Error al crear bug");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-muted p-4 rounded-xl shadow">
      <div>
        <Label>Título</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Ej: Error al guardar cambios"
        />
      </div>

      <div>
        <Label>Prioridad</Label>
        <Select value={priority} onValueChange={(v) => setPriority(v as BugPriority)}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar prioridad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="HIGH">Alta</SelectItem>
            <SelectItem value="MEDIUM">Media</SelectItem>
            <SelectItem value="LOW">Baja</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Creando..." : "Crear incidencia"}
      </Button>
    </form>
  );
}
