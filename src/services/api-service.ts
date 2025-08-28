export class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = "https://api-landing-seven.vercel.app";
  }

  async sendSubscription(data: {
    nombre: string;
    apellido: string;
    email: string;
    whatsapp?: string;
    planPago?: string;
  }) {
    try {
      const response = await fetch(`${this.baseURL}/enviar-inscripcion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error sending subscription:", error);
      throw error;
    }
  }

  async sendClaseIntro(data: {
    nombre: string;
    apellido: string;
    email: string;
    whatsapp?: string;
  }) {
    try {
      const response = await fetch(`${this.baseURL}/clase-intro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error sending subscription:", error);
      throw error;
    }
  }

  async sendConsultation(data: {
    email: string;
    message?: string;
    nombre?: string;
  }) {
    try {
      const response = await fetch(`${this.baseURL}/enviar-consulta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error sending consultation:", error);
      throw error;
    }
  }

  async sendContactMessage(data: {
    email: string;
    nombre: string;
    mensaje: string;
  }) {
    try {
      const response = await fetch(`${this.baseURL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error sending contact message:", error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
