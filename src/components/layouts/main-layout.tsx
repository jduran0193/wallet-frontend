import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { path: "/", label: "Inicio" },
  { path: "/register", label: "Registro" },
  { path: "/recharge", label: "Recargar" },
  { path: "/payment", label: "Pagar" },
  { path: "/confirm-payment", label: "Confirmar Pago" },
  { path: "/balance", label: "Consultar Balance" },
];

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-center w-full">
          <div className="hidden md:flex items-center w-full justify-center">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">E-Wallet</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    location.pathname === item.path
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:hidden absolute left-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="default"
                  className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 bg-blue-800"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <SheetHeader>
                  <SheetTitle>Wallet</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-3 mt-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "px-2 py-1 text-sm transition-colors hover:text-foreground/80",
                        location.pathname === item.path
                          ? "font-medium text-foreground"
                          : "text-foreground/60"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-md">{children}</div>
      </main>
    </div>
  );
}
