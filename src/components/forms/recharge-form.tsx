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
import { RechargeFormValues, rechargeSchema } from "@/lib/schemas/wallet";
import { walletApi } from "@/lib/services/api.service";

export function RechargeForm() {
  const form = useForm<RechargeFormValues>({
    resolver: zodResolver(rechargeSchema),
    defaultValues: {
      document: "",
      phone: "",
      amount: 0,
    },
  });

  async function onSubmit(values: RechargeFormValues) {
    try {
      const response = await walletApi.rechargeWallet(values);
      if (response.success) {
        toast.success("Recarga realizada exitosamente");
        form.reset();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Error al realizar la recarga", {
        description: error instanceof Error ? error.message : "Error",
      });
    }
  }

  return (
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
              <FormLabel>Monto a recargar</FormLabel>
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
          Realizar Recarga
        </Button>
      </form>
    </Form>
  );
}
