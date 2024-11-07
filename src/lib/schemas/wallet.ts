import * as z from "zod";

export const registerClientSchema = z.object({
  document: z.string().min(1, "El documento es requerido"),
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "El teléfono es requerido"),
});

export const rechargeSchema = z.object({
  document: z.string().min(1, "El documento es requerido"),
  phone: z.string().min(1, "El teléfono es requerido"),
  amount: z.number().min(0.01, "El monto debe ser mayor a 0"),
});

export const paymentSchema = z.object({
  document: z.string().min(1, "El documento es requerido"),
  phone: z.string().min(1, "El teléfono es requerido"),
  amount: z.number().min(0.01, "El monto debe ser mayor a 0"),
});

export const confirmPaymentSchema = z.object({
  sessionId: z.string().min(1, "El ID de sesión es requerido"),
  token: z.string().length(6, "El token debe tener 6 dígitos"),
  amount: z.number().min(0.01, "El monto debe ser mayor a 0"),
});

export const balanceSchema = z.object({
  document: z.string().min(1, "El documento es requerido"),
  phone: z.string().min(1, "El teléfono es requerido"),
});

export type RegisterClientFormValues = z.infer<typeof registerClientSchema>;
export type RechargeFormValues = z.infer<typeof rechargeSchema>;
export type PaymentFormValues = z.infer<typeof paymentSchema>;
export type ConfirmPaymentFormValues = z.infer<typeof confirmPaymentSchema>;
export type BalanceFormValues = z.infer<typeof balanceSchema>;
