function GerarPaginaHtml(codigo: string): string {
    const paginaHtmlEmail = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Recuperação de Senha</title>
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
    .code {
        font-size: 26px;
        font-weight: bold;
        color: #000088;
        letter-spacing: 4px;
        margin: 25px 0;
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
        <h1>Recuperação de Senha</h1>
    </div>

    <div class="content">
        <p>Olá,</p>
        <p>Você solicitou a recuperação de sua senha.</p>
        <p>Utilize o código abaixo para continuar o processo:</p>

        <div class="code">${codigo}</div>

        <p>Se você não solicitou esta recuperação, ignore este e-mail.</p>

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
    return paginaHtmlEmail
}
export default GerarPaginaHtml