// src/utils/mailer/mailer.js

import Brevo from "@getbrevo/brevo";
import dotenv from "dotenv";
dotenv.config();

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.authentications['apiKey'].apiKey = process.env.BREVO_API_KEY;

export async function enviarCorreo(destinatario, asunto, mensajeHtml) {
  try {
    const email = {
      to: [{ email: destinatario }],
      subject: asunto,
      htmlContent: mensajeHtml,
      sender: { name: "Recordatorios Web", email: process.env.BREVO_SENDER_EMAIL }
    };
    console.log(process.env.BREVO_API_KEY, process.env.BREVO_SENDER_EMAIL)
    await apiInstance.sendTransacEmail(email);
    console.log("Correo enviado a:", destinatario);
  } catch (error) {
    console.error("Error enviando correo:", error);
  }
}
