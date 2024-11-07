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
import { BalanceFormValues, balanceSchema } from "@/lib/schemas/wallet";
import { walletApi } from "@/lib/services/api.service";
import { ApiResponse } from "@/lib/types/api";

export function BalanceForm() {
  const [balance, setBalance] = useState<number | null>(null);

  const form = useForm<BalanceFormValues>({
    resolver: zodResolver(balanceSchema),
    defaultValues: {
      document: "",
      phone: "",
    },
  });

  async function onSubmit(values: BalanceFormValues) {
    try {
      const response = (await walletApi.getBalance(
        values.document,
        values.phone
      )) as ApiResponse<{ balance: number }>;
      if (response.success && response.data) {
        setBalance(response.data.balance);
        toast.success("Balance consultado exitosamente");
      } else {
        toast.error(response.message);
        setBalance(null);
      }
    } catch (error) {
      toast.error("Error al consultar el balance", {
        description: error instanceof Error ? error.message : "Error",
      });
      setBalance(null);
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
          <Button type="submit" className="w-full">
            Consultar Balance
          </Button>
        </form>
      </Form>

      {balance !== null && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-lg font-semibold">
              Balance actual: ${balance.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
