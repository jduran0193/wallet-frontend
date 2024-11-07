import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  RegisterClientFormValues,
  registerClientSchema,
} from "@/lib/schemas/wallet";
import { walletApi } from "@/lib/services/api.service";
import { ErrorCode } from "@/lib/types/api";

export function RegisterForm() {
  const form = useForm<RegisterClientFormValues>({
    resolver: zodResolver(registerClientSchema),
    defaultValues: {
      document: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: RegisterClientFormValues) {
    try {
      const response = await walletApi.registerClient(values);

      if (!response.success) {
        switch (response.error) {
          case ErrorCode.CLIENT_EXISTS:
            toast.error("El cliente ya existe con este documento y teléfono");
            return;
          default:
            toast.error(response.message || "Error al registrar cliente");
            return;
        }
      }

      toast.success("Cliente registrado exitosamente");
      form.reset();
    } catch (error) {
      toast.error("Error al registrar cliente", {
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
              <FormDescription>
                Documento de identidad único del cliente
              </FormDescription>
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
              <FormDescription>Número de teléfono del cliente</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese su nombre completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Se enviará el token de confirmación a este correo
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Registrar Cliente
        </Button>
      </form>
    </Form>
  );
}
