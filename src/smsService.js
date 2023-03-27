import twilio from "twilio";
import { config } from "dotenv";
config();

const accountSid = process.env.accountSid_ENV;
const authToken = process.env.authToken_ENV;
const client = twilio(accountSid, authToken);
const toNumber = process.env.adminPhono_ENV;

async function sendWsp(userCartProds) {
  console.log(userCartProds)
  try {
    const optionswsp = {
      body: `Cart purchased : ${JSON.stringify(userCartProds)}`,
      from: "whatsapp:+15073846914",
      to: `whatsapp:${toNumber}`,
    };
    const message = await client.messages.create(optionswsp);

    console.log("Wsp Enviado " + message);
  } catch (err) {
    throw new Error(err);
  }
}

async function sendSms(numUsuario) {
  try {
    const optionssms = {
      body: "Su pedido se esta procesando...",
      from: "+15073846914",
      to: numUsuario,
    };
    const message = await client.messages.create(optionssms);

    console.log("SMS Enviado " + message);
  } catch (err) {
    throw new Error(err);
  }
}

export const smsService = {
  sendWsp,
  sendSms,
};