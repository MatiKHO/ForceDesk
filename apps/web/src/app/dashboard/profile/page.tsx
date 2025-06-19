'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import api from '../../../../lib/axios';


interface User {
  id: number;
  username: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No hay token, no se hace la petición");
      return;
    }
    try {
      const res = await api.get('/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data && res.data.message) {
        alert(res.data.message);
        setUser(null);
        setNewUsername('');
        return;
      }

      if (res.data && typeof res.data === 'object' && res.data.id && res.data.username) {
        setUser(res.data);
        setNewUsername(res.data.username);
      } else {
        setUser(null);
        setNewUsername('');
        console.warn("La respuesta del backend no es un usuario válido:", res.data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setUser(null);
      setNewUsername('');
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    await api.patch(`/users/profile`, { username: newUsername }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEditing(false);
    fetchProfile();
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <p>No hay usuario, cargando perfil...</p>;

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader className="flex flex-col items-center gap-4">
        <Avatar className="w-20 h-20">
          <AvatarImage src="" alt={user.username} />
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl">¡Hola, {user.username}!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {editing ? (
          <div className="flex items-center gap-2">
            <Input
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="flex-1"
            />
            <Button size="sm" onClick={handleSave}>Guardar</Button>
            <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>Cancelar</Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Usuario: {user.username}</span>
            <Button size="sm" variant="outline" onClick={() => setEditing(true)}>Editar</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
