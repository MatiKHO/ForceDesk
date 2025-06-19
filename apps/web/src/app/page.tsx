"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sword, Bug, Shield, Zap, ArrowRight, LogIn, UserPlus, ArrowUp } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const features = [
    {
      icon: <Bug className="h-6 w-6" />,
      title: "Gestión de Incidencias",
      description: "Organiza y rastrea todos los bugs de tu proyecto de manera eficiente",
      color: "text-blue-500"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Control de Acceso",
      description: "Sistema de roles Master y Padawan para diferentes niveles de permisos",
      color: "text-blue-400"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Interfaz Moderna",
      description: "Diseño intuitivo y responsive para una experiencia de usuario excepcional",
      color: "text-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-400 to-sky-500 rounded-lg">
              <Sword className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-sky-600 bg-clip-text text-transparent">
              ForceDesk
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => router.push("/login")}
              className="flex items-center gap-2 border-blue-200 hover:bg-blue-50 text-blue-600"
            >
              <LogIn className="h-4 w-4" />
              Iniciar Sesión
            </Button>
            <Button
              onClick={() => router.push("/register")}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-400 to-sky-500 hover:from-blue-500 hover:to-sky-600"
            >
              <UserPlus className="h-4 w-4" />
              Registrarse
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Hero Content */}
          <div className="space-y-6">
            <Badge variant="secondary" className="text-sm bg-gradient-to-r from-blue-100 to-sky-100 text-blue-600 border-blue-200">
              🗡️ El gestor de incidencias que usa Yoda
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Gestiona tus{" "}
              <span className="bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 bg-clip-text text-transparent">
                incidencias
              </span>{" "}
              con la fuerza
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              ForceDesk te ayuda a organizar, rastrear y resolver bugs de manera eficiente. 
              Únete a la fuerza y lleva tu gestión de incidencias al siguiente nivel.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => router.push("/register")}
              className="flex items-center gap-2 text-lg px-8 py-6 bg-gradient-to-r from-blue-400 to-sky-500 hover:from-blue-500 hover:to-sky-600"
            >
              Comenzar Ahora
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/login")}
              className="flex items-center gap-2 text-lg px-8 py-6 border-blue-200 hover:bg-blue-50 text-blue-600"
            >
              Ya tengo cuenta
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-sky-600 bg-clip-text text-transparent">
              ¿Por qué elegir ForceDesk?
            </h2>
            <p className="text-muted-foreground text-lg">
              Características diseñadas para hacer tu trabajo más eficiente
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-t-4 border-t-blue-200 hover:border-t-blue-300">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-full ${feature.color.replace('text-', 'bg-').replace('-400', '-100').replace('-500', '-100').replace('-600', '-100')} ${feature.color}`}>
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className={`text-xl ${feature.color}`}>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24">
          <Card className="bg-gradient-to-r from-blue-50 to-sky-50 border-blue-200">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-500">100%</div>
                  <div className="text-muted-foreground">Confiable</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-400">24/7</div>
                  <div className="text-muted-foreground">Disponible</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-sky-500">∞</div>
                  <div className="text-muted-foreground">Posibilidades</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Final CTA */}
        <div className="mt-24 text-center space-y-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 bg-clip-text text-transparent">
            ¿Listo para unirte a la fuerza?
          </h2>
          <p className="text-muted-foreground text-lg">
            Crea tu cuenta gratuita y comienza a gestionar incidencias como un verdadero Jedi
          </p>
          
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-24 border-t border-blue-200">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-400 to-sky-500 rounded-lg">
              <Sword className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-sky-600 bg-clip-text text-transparent">
              ForceDesk
            </span>
          </div>
          <p className="text-muted-foreground">
            © 2024 ForceDesk. Que la fuerza te acompañe en la gestión de incidencias.
          </p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg bg-gradient-to-r from-blue-400 to-sky-500 hover:from-blue-500 hover:to-sky-600 transition-all duration-300 hover:scale-110"
          size="sm"
        >
          <ArrowUp className="h-5 w-5 text-white" />
        </Button>
      )}
    </div>
  );
}
