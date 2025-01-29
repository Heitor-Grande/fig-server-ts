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
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .header {
                text-align: center;
                padding: 10px 0;
                background-color: #4CAF50;
                color: #fff;
                border-radius: 8px 8px 0 0;
                }
                .header h1 {
                margin: 0;
                font-size: 24px;
                }
                .content {
                margin: 20px 0;
                text-align: center;
                }
                .content p {
                font-size: 16px;
                color: #333;
                }
                .code {
                font-size: 24px;
                font-weight: bold;
                color: #4CAF50;
                letter-spacing: 2px;
                margin: 20px 0;
                }
                .footer {
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #888;
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
                <p>Você solicitou a recuperação de sua senha. Por favor, utilize o código abaixo para continuar o processo:</p>
                <div class="code">${codigo}</div>
                <p>Se você não solicitou esta recuperação, por favor ignore este e-mail.</p>
                </div>
                <div class="footer">
                <p>© 2024 GRANDE SOLUÇÕES DIGITAIS. Todos os direitos reservados.</p>
                </div>
            </div>
            </body>
            </html>
    `
    return paginaHtmlEmail
}
export default GerarPaginaHtml