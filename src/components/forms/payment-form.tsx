import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PaymentFormValues, paymentSchema } from "@/lib/schemas/wallet";
import { walletApi } from "@/lib/services/api.service";
import { ApiResponse } from "@/lib/types/api";

export function PaymentForm() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      document: "",
      phone: "",
      amount: 0,
    },
  });

  async function onSubmit(values: PaymentFormValues) {
    try {
      const response = (await walletApi.initiatePayment(
        values
      )) as ApiResponse<{
        sessionId: string;
      }>;
      if (response.success && response.data) {
        setSessionId(response.data.sessionId);
        toast.success("Token enviado al correo electrónico");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Error al iniciar el pago", {
        description: error instanceof Error ? error.message : "Error",
      });
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="document"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Documento</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese su documento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese su teléfono" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monto</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Iniciar Pago
          </Button>
        </form>
      </Form>

      {sessionId && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Se ha enviado un token a su correo electrónico. Por favor, use el
              ID de sesión para confirmar el pago:
            </p>
            <p className="mt-2 font-mono text-sm">{sessionId}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
