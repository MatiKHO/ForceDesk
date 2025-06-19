"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sword, User, Lock, Eye, EyeOff, Crown, UserCheck } from "lucide-react";
import { toast } from "sonner";
import api from "../../../lib/axios";

type Role = 'MASTER' | 'PADAWAN';

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<Role>('PADAWAN');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const register = async () => {
    // Validaciones
    if (!username || !password || !confirmPassword) {
      setError("Por favor, completa todos los campos");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/register", {
        username,
        password,
        role,
      });

      toast.success("¡Cuenta creada exitosamente! Inicia sesión para continuar.");
      router.push("/login");
    } catch (error: any) {
      console.error("Register error:", error);
      const errorMessage = error.response?.data?.message || "Error al crear la cuenta";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      register();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-r from-blue-400 to-sky-500 rounded-full">
              <Sword className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-500 to-sky-600 bg-clip-text text-transparent">
            ForceDesk
          </h1>
          <p className="text-muted-foreground">
            El gestor de incidencias que usa Yoda
          </p>
        </div>

        {/* Register Card */}
        <Card className="shadow-lg border-blue-200">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center bg-gradient-to-r from-blue-500 to-sky-600 bg-clip-text text-transparent">
              Crear Cuenta
            </CardTitle>
            <CardDescription className="text-center">
              Únete a la fuerza y gestiona incidencias
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Ingresa tu usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 border-blue-200 focus:border-blue-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 pr-10 border-blue-200 focus:border-blue-400"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-blue-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repite tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 pr-10 border-blue-200 focus:border-blue-400"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-blue-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <Select value={role} onValueChange={(value: Role) => setRole(value)}>
                <SelectTrigger className="border-blue-200 focus:border-blue-400">
                  <SelectValue placeholder="Selecciona tu rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PADAWAN" className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4" />
                    Padawan - Aprendiz
                  </SelectItem>
                  <SelectItem value="MASTER" className="flex items-center gap-2">
                    <Crown className="h-4 w-4" />
                    Master - Experto
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={register} 
              className="w-full bg-gradient-to-r from-blue-400 to-sky-500 hover:from-blue-500 hover:to-sky-600" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Creando cuenta...
                </div>
              ) : (
                "Crear Cuenta"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?
          </p>
          <Button 
            variant="outline" 
            onClick={() => router.push("/login")}
            className="w-full border-blue-200 hover:bg-blue-50 text-blue-600"
          >
            Iniciar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
} 