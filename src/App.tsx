import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import { BalanceForm } from "@/components/forms/balance-form";
import { ConfirmPaymentForm } from "@/components/forms/confirm-payment-form";
import { PaymentForm } from "@/components/forms/payment-form";
import { RechargeForm } from "@/components/forms/recharge-form";
import { RegisterForm } from "@/components/forms/register-form";
import { MainLayout } from "@/components/layouts/main-layout";
import { Home } from "@/pages/home";
function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/recharge" element={<RechargeForm />} />
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/confirm-payment" element={<ConfirmPaymentForm />} />
          <Route path="/balance" element={<BalanceForm />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
