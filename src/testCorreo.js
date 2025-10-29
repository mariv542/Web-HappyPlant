import dotenv from "dotenv";
dotenv.config();

import { enviarCorreo } from './utils/mailer/mailer.js';

const destinatario = "martinezcristobal2005@gmail.com"; // pon tu correo real
const asunto = "Recordatorio: Hora de regar tus orquídeas";
const mensaje = "<h1>¡Es momento de regar tus plantas!</h1>";

enviarCorreo(destinatario, asunto, mensaje);
