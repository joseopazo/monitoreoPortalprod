const nodemailer = require('nodemailer');

const status = process.argv[2]; // "success" o "failure"

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const subject = status === "success"
  ? "✅ Pipeline exitosa: Monitoreo Portal 1.0 "
  : "❌ Papiline Fallida: Monitoreo Portal 1.0";

const body = status === "success"
  ? "El monitoreo automatizado del Portal 1.0 fue exitoso.."
  : "Falló el monitoreo automático. Revisa los logs: https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}";

transporter.sendMail({
  from: `"Monitoreo Portal Produccion" <${process.env.SMTP_USER}>`,
  to: "luis.cruz@falp.org,karen.sudzuki@falp.org,rogelio.cisternas@falp.org",
  subject,
  text: body
}, (error, info) => {
  if (error) {
    console.log("❌ Error al enviar correo:", error);
    process.exit(1);
  } else {
    console.log("✅ Correo enviado:", info.response);
  }
});
