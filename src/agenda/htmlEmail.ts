export const htmlEmailAguardandoAprovacao = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Agendamento Pendente</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f4;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:20px;">
        <tr>
            <td align="center">
                
                <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden;">
                    
                    <!-- HEADER -->
                    <tr>
                        <td style="background-color:#000088; padding:20px; text-align:center;">
                            <h1 style="color:#ffffff; margin:0; font-size:22px;">
                                Pedido de Agendamento
                            </h1>
                        </td>
                    </tr>

                    <!-- BODY -->
                    <tr>
                        <td style="padding:30px; color:#333333;">
                            
                            <p style="font-size:16px; margin-bottom:20px;">
                                Olá,
                            </p>

                            <p style="font-size:16px; margin-bottom:20px;">
                                Recebemos um novo <strong>pedido de agendamento</strong> em nosso sistema.
                            </p>

                            <p style="font-size:16px; margin-bottom:20px;">
                                ⚠️ Este agendamento encontra-se <strong style="color:#000088;">pendente de aprovação</strong>.
                            </p>

                            <p style="font-size:16px; margin-bottom:20px;">
                                Há um pedido de agendamento aguardando sua análise.
                            </p>

                            <p style="font-size:16px; margin-bottom:20px;">
                                Por favor, avalie as informações e realize a <strong>aprovação</strong> ou <strong>recusa</strong> do agendamento pendente.
                            </p>

                            <hr style="border:none; border-top:1px solid #eeeeee; margin:30px 0;" />

                            <p style="font-size:14px; color:#777777;">
                                Este é um e-mail automático, por favor não responda.
                            </p>

                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <div class="footer">
                        <p>© 2024 GRANDE SOLUÇÕES DIGITAIS. Todos os direitos reservados.</p>
                    </div>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
`

export const htmlEmailAgendamentoRecebido = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Agendamento Pendente</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f4;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding:20px;">
        <tr>
            <td align="center">
                
                <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden;">
                    
                    <!-- HEADER -->
                    <tr>
                        <td style="background-color:#000088; padding:20px; text-align:center;">
                            <h1 style="color:#ffffff; margin:0; font-size:22px;">
                                Pedido de Agendamento
                            </h1>
                        </td>
                    </tr>

                    <!-- BODY -->
                    <tr>
                        <td style="padding:30px; color:#333333;">
                            
                            <p style="font-size:16px; margin-bottom:20px;">
                                Olá,
                            </p>

                            <p style="font-size:16px; margin-bottom:20px;">
                                Recebemos um novo <strong>pedido de agendamento</strong> em nosso sistema.
                            </p>

                            <p style="font-size:16px; margin-bottom:20px;">
                                ⚠️ Este agendamento encontra-se <strong style="color:#000088;">pendente de aprovação</strong>.
                            </p>

                            <p style="font-size:16px; margin-bottom:20px;"> 
                            Assim que for analisado, você será notificado com a confirmação ou atualização do status. 
                            </p>

                            <hr style="border:none; border-top:1px solid #eeeeee; margin:30px 0;" />

                            <p style="font-size:14px; color:#777777;">
                                Este é um e-mail automático, por favor não responda.
                            </p>

                        </td>
                    </tr>

                    <!-- FOOTER -->
                    <div class="footer">
                        <p>© 2024 GRANDE SOLUÇÕES DIGITAIS. Todos os direitos reservados.</p>
                    </div>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
`

export const htmlAgendamentoRecusado = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Agendamento Recusado</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
    }
    .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 0;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
        text-align: center;
        padding: 20px;
        background-color: #000088;
        color: #ffffff;
    }
    .header h1 {
        margin: 0;
        font-size: 22px;
    }
    .content {
        padding: 30px 20px;
        text-align: center;
    }
    .content p {
        font-size: 16px;
        color: #333333;
        margin-bottom: 15px;
    }
    .status {
        font-size: 18px;
        font-weight: bold;
        color: #000088;
        margin: 20px 0;
    }
    .divider {
        border-top: 1px solid #eeeeee;
        margin: 25px 0;
    }
    .footer {
        text-align: center;
        padding: 15px;
        font-size: 12px;
        color: #ffffff;
        background-color: #000088;
    }
</style>
</head>
<body>
<div class="container">

    <div class="header">
        <h1>Status do Agendamento</h1>
    </div>

    <div class="content">
        <p>Olá,</p>

        <p>Seu pedido de agendamento foi analisado.</p>

        <div class="status">
            ❌ Agendamento Recusado
        </div>

        <p>Infelizmente, não foi possível aprovar este agendamento no horário solicitado.</p>

        <p>Se necessário, você pode realizar uma nova solicitação com outro horário.</p>

        <div class="divider"></div>

        <p style="font-size:13px; color:#777;">
            Este é um e-mail automático, por favor não responda.
        </p>
    </div>

    <div class="footer">
        <p>© 2024 GRANDE SOLUÇÕES DIGITAIS. Todos os direitos reservados.</p>
    </div>

</div>
</body>
</html>
`;

export function gerarHtmlAgendamentoAprovado(data: string) {


    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Agendamento Aprovado</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
    }
    .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 0;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
        text-align: center;
        padding: 20px;
        background-color: #000088;
        color: #ffffff;
    }
    .header h1 {
        margin: 0;
        font-size: 22px;
    }
    .content {
        padding: 30px 20px;
        text-align: center;
    }
    .content p {
        font-size: 16px;
        color: #333333;
        margin-bottom: 15px;
    }
    .status {
        font-size: 18px;
        font-weight: bold;
        color: #000088;
        margin: 20px 0;
    }
    .info {
        font-size: 16px;
        background-color: #f8f8ff;
        padding: 15px;
        border-radius: 6px;
        margin: 20px 0;
        color: #000088;
    }
    .divider {
        border-top: 1px solid #eeeeee;
        margin: 25px 0;
    }
    .footer {
        text-align: center;
        padding: 15px;
        font-size: 12px;
        color: #ffffff;
        background-color: #000088;
    }
</style>
</head>
<body>
<div class="container">

    <div class="header">
        <h1>Agendamento Confirmado</h1>
    </div>

    <div class="content">
        <p>Olá,</p>

        <p>Seu pedido de agendamento foi analisado e aprovado com sucesso.</p>

        <div class="status">
            ✅ Agendamento Aprovado
        </div>

        <div class="info">
            📅 Data: <strong>${data}</strong><br/>
        </div>

        <p>Por favor, esteja disponível no horário informado.</p>

        <div class="divider"></div>

        <p style="font-size:13px; color:#777;">
            Este é um e-mail automático, por favor não responda.
        </p>
    </div>

    <div class="footer">
        <p>© 2024 GRANDE SOLUÇÕES DIGITAIS. Todos os direitos reservados.</p>
    </div>

</div>
</body>
</html>
`;
}

export function gerarHtmlAgendamentoFinalizado(data: string) {


    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Agendamento Finalizado</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
    }
    .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 0;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
        text-align: center;
        padding: 20px;
        background-color: #000088;
        color: #ffffff;
    }
    .header h1 {
        margin: 0;
        font-size: 22px;
    }
    .content {
        padding: 30px 20px;
        text-align: center;
    }
    .content p {
        font-size: 16px;
        color: #333333;
        margin-bottom: 15px;
    }
    .status {
        font-size: 18px;
        font-weight: bold;
        color: #000088;
        margin: 20px 0;
    }
    .info {
        font-size: 16px;
        background-color: #f8f8ff;
        padding: 15px;
        border-radius: 6px;
        margin: 20px 0;
        color: #000088;
    }
    .divider {
        border-top: 1px solid #eeeeee;
        margin: 25px 0;
    }
    .footer {
        text-align: center;
        padding: 15px;
        font-size: 12px;
        color: #ffffff;
        background-color: #000088;
    }
</style>
</head>
<body>
<div class="container">

    <div class="header">
        <h1>Agendamento Finalizado</h1>
    </div>

    <div class="content">
        <p>Olá,</p>

        <p>Seu agendamento foi finalizado com sucesso.</p>

        <div class="status">
            ✅ Agendamento Finalizado
        </div>

        <div class="info">
            📅 Data: <strong>${data}</strong><br/>
        </div>

        <p>Agradecemos a preferência!</p>

        <div class="divider"></div>

        <p style="font-size:13px; color:#777;">
            Este é um e-mail automático, por favor não responda.
        </p>
    </div>

    <div class="footer">
        <p>© 2024 GRANDE SOLUÇÕES DIGITAIS. Todos os direitos reservados.</p>
    </div>

</div>
</body>
</html>
`;
}