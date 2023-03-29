import { config } from "dotenv";
import { createTransport } from "nodemailer";

config();

const trasporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: process.env.MAIL_ADMIN,
      pass: process.env.TPWD,
    },
  });

 
   
  const sendMail = async (usuario,nombre ) => {

    const mailOptions = {
    from: "Server Node",
    to: process.env.MAIL_ADMIN,
    subject: "Nuevo Usuario Registrado",
    html: `<h3 style="color: blue;">usuario: ${usuario}</h3>
            <h3 style="color: blue;">nombre: ${nombre}</h3>
            `,
    
  };
  try {
    const info = await trasporter.sendMail(mailOptions);
  
    console.log(info);
  } catch (err) {
    console.log(err);
  }
}

async function sendMailCartPurchased(userName, userMail, userCart) {
  try {
    const mailOptCartPurchased = {
      from: "Node Service",
      to: process.env.MAIL_ADMIN,
      subject: `Nuevo pedido de : ${userName} ${userMail} `,
      html: `<h3 style="color: blue;">Nuevo carrito comprado : <span style="color: green;"> ${JSON.stringify(
        userCart
      )} </span></h3>`,
    };
    const info = await trasporter.sendMail(mailOptCartPurchased);

    console.log(info);
  } catch (err) {
    throw new Error(err);
  }
}

export const mailService = {
  sendMail,
  sendMailCartPurchased,
};