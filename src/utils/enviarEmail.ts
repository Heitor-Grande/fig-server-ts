import { createTransport } from "nodemailer";

export default async function enviarEmail(destinatario: string, titulo: string, html: string) {

    try {

        const transporter = createTransport({
            host: process.env.HOST_SMTP,
            port: parseInt(process.env.PORT_SMTP),
            secure: false,
            auth: {
                user: process.env.USER_SMTP,
                pass: process.env.PASS_SMTP
            }
        })

        await transporter.sendMail({
            from: process.env.USER_SMTP,
            to: destinatario,
            subject: titulo,
            html: html
        })

        return {
            sucesso: true,
            msg: "Sucesso ao enviar e-mail"
        }
    } catch (error) {

        return {
            sucesso: false,
            msg: "Erro ao enviar notificação por e-mail."
        }
    }
}