import { IResponse } from "@/lib/types/api";

const API_BASE_URL = import.meta.env.VITE_API_URL;
export const walletApi = {
  registerClient: async (clientData: any): Promise<IResponse> => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    });
    return response.json();
  },

  rechargeWallet: async (rechargeData: any): Promise<IResponse> => {
    const response = await fetch(`${API_BASE_URL}/recharge`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rechargeData),
    });
    return response.json();
  },

  initiatePayment: async (paymentData: any): Promise<IResponse> => {
    const response = await fetch(`${API_BASE_URL}/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });
    return response.json();
  },

  confirmPayment: async (confirmationData: any): Promise<IResponse> => {
    const response = await fetch(`${API_BASE_URL}/confirm-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(confirmationData),
    });
    return response.json();
  },

  getBalance: async (document: string, phone: string): Promise<IResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/balance?document=${document}&phone=${phone}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  },
};
