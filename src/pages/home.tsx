import { CreditCard, PiggyBank, Search, UserPlus, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const features = [
  {
    icon: UserPlus,
    title: "Registro",
    description: "Crea una nueva cuenta",
    path: "/register",
  },
  {
    icon: PiggyBank,
    title: "Recargar",
    description: "Añade fondos a tu cuenta",
    path: "/recharge",
  },
  {
    icon: CreditCard,
    title: "Pagar",
    description: "Realiza pagos de forma segura",
    path: "/payment",
  },
  {
    icon: Search,
    title: "Consultar",
    description: "Revisa tu saldo actual",
    path: "/balance",
  },
];

export function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Wallet className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-blue-800">
          ePayco-Wallet
        </h1>
        <p className="text-muted-foreground">
          Gestiona tu dinero electrónico de manera segura y fácil
        </p>
      </div>

      <Separator />

      <div className="grid gap-4 md:grid-cols-2">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link key={feature.path} to={feature.path}>
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
