'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Home, Sword } from 'lucide-react';
import api from '../../../../lib/axios';

interface User {
  id: number;
  username: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const router = useRouter();

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-sky-600 bg-clip-text text-transparent">
              Mi Perfil
            </h1>
            <p className="text-muted-foreground">Gestiona tu información personal</p>
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
              onClick={() => router.push("/dashboard/bugs")}
              className="flex items-center gap-2 border-blue-200 hover:bg-blue-50 text-blue-600"
            >
              <Sword className="h-4 w-4" />
              Incidencias
            </Button>
          </div>
        </div>

        <Card className="max-w-md mx-auto border-blue-200">
          <CardHeader className="flex flex-col items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="" alt={user.username} />
              <AvatarFallback className="bg-gradient-to-r from-blue-400 to-sky-500 text-white text-xl">
                {user.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl bg-gradient-to-r from-blue-500 to-sky-600 bg-clip-text text-transparent">
              ¡Hola, {user.username}!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {editing ? (
              <div className="flex items-center gap-2">
                <Input
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="flex-1 border-blue-200 focus:border-blue-400"
                />
                <Button 
                  size="sm" 
                  onClick={handleSave}
                  className="bg-gradient-to-r from-blue-400 to-sky-500 hover:from-blue-500 hover:to-sky-600"
                >
                  Guardar
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setEditing(false)}
                  className="text-blue-600 hover:bg-blue-50"
                >
                  Cancelar
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Usuario: {user.username}</span>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setEditing(true)}
                  className="border-blue-200 hover:bg-blue-50 text-blue-600"
                >
                  Editar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
