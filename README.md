# Wallet API Frontend

## 🚀 Descripción del Proyecto

Frontend para una aplicación de billetera digital que permite a los usuarios registrarse, consultar saldos y realizar transacciones.

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca principal para la construcción de la interfaz
- **TypeScript** - Tipado estático para mejor mantenibilidad
- **Vite** - Bundler y herramienta de desarrollo
- **Tailwind CSS** - Framework de CSS utilitario
- **Shadcn/ui** - Componentes de UI reutilizables
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **React Router DOM** - Navegación y gestión de rutas

## 🗺️ Rutas de la Aplicación

La aplicación utiliza React Router DOM para la gestión de rutas. Las principales rutas son:

```tsx
<Routes>
  <Route path="/" element={<Home />} /> {/* Página principal */}
  <Route path="/register" element={<RegisterForm />} /> {/* Registro de clientes */}
  <Route path="/recharge" element={<RechargeForm />} /> {/* Recarga de saldo */}
  <Route path="/payment" element={<PaymentForm />} /> {/* Realizar pagos */}
  <Route path="/confirm-payment" element={<ConfirmPaymentForm />} />{" "}
  {/* Confirmación de pago */}
  <Route path="/balance" element={<BalanceForm />} /> {/* Consulta de saldo */}
</Routes>
```

## 📁 Estructura del Proyecto

```
src/
├── assets/         # Recursos estáticos (imágenes, fonts, etc)
├── components/     # Componentes reutilizables
│   ├── forms/     # Formularios de la aplicación
│   │   ├── register-form.tsx    # Registro de clientes
│   │   ├── balance-form.tsx     # Consulta de saldo
│   │   ├── recharge-form.tsx    # Recarga de saldo
│   │   ├── payment-form.tsx     # Realizar pagos
│   │   └── confirm-payment-form.tsx  # Confirmación de pagos
│   ├── layouts/   # Layouts y estructuras base
│   └── ui/        # Componentes de interfaz usuario
├── lib/           # Utilidades y configuraciones
│   ├── schemas/   # Esquemas de validación Zod
│   ├── services/  # Servicios y llamadas API
│   └── types/     # Tipos y interfaces TypeScript
├── pages/         # Páginas de la aplicación
└── utils/         # Funciones utilitarias
```

## 🚀 Instalación y Configuración

1. Clonar el repositorio:

```bash
git clone [url-del-repositorio]
```

2. Instalar dependencias:

```bash
npm install
```

3. Copiar el archivo de variables de entorno:

```bash
cp .env.example .env
```

4. Configurar las variables de entorno en el archivo `.env`:

```env
VITE_API_URL=http://localhost:3000
```

5. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

## 📑 Formularios de la Aplicación

La aplicación cuenta con varios formularios para gestionar las diferentes operaciones:

### 🔐 Registro de Cliente (`register-form.tsx`)

- Permite registrar nuevos clientes en el sistema
- Campos: Documento, Teléfono, Email, Nombre completo
- Validaciones con Zod para todos los campos
- Manejo de errores específicos (ej: cliente ya existente)

### 💰 Consulta de Saldo (`balance-form.tsx`)

- Consulta el saldo disponible de un cliente
- Campos: Documento, Teléfono
- Muestra el balance actual en pantalla
- Validación de cliente existente

### 💵 Recarga de Saldo (`recharge-form.tsx`)

- Permite recargar saldo a una billetera
- Campos: Documento, Teléfono, Monto
- Validación de montos mínimos/máximos
- Confirmación de recarga exitosa

### 💳 Realizar Pago (`payment-form.tsx`)

- Procesa pagos desde la billetera
- Campos: Documento origen, Teléfono origen, Documento destino, Teléfono destino, Monto
- Validación de fondos suficientes
- Verificación de cuentas origen y destino

### ✅ Confirmación de Pago (`confirm-payment-form.tsx`)

- Pantalla de confirmación para transacciones
- Muestra resumen de la operación
- Confirmación final del pago
- Comprobante de transacción exitosa

Cada formulario utiliza:

- React Hook Form para el manejo de estados
- Zod para validaciones
- Shadcn/ui para componentes de UI
- Manejo de errores
- Toast notifications para feedback al usuario
