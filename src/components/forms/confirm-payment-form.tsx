import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ConfirmPaymentFormValues,
  confirmPaymentSchema,
} from "@/lib/schemas/wallet";
import { walletApi } from "@/lib/services/api.service";

export function ConfirmPaymentForm() {
  const form = useForm<ConfirmPaymentFormValues>({
    resolver: zodResolver(confirmPaymentSchema),
    defaultValues: {
      sessionId: "",
      token: "",
      amount: 0,
    },
  });

  async function onSubmit(values: ConfirmPaymentFormValues) {
    try {
      const response = await walletApi.confirmPayment(values);
      if (response.success) {
        toast.success("Pago confirmado exitosamente");
        form.reset();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Error al confirmar el pago", {
        description: error instanceof Error ? error.message : "Error",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="sessionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID de Sesión</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese el ID de sesión" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingrese el token de 6 dígitos"
                  maxLength={6}
                  {...field}
                />
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
          Confirmar Pago
        </Button>
      </form>
    </Form>
  );
}
