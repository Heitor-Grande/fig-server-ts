import { Injectable } from '@nestjs/common';

@Injectable()
export class VerificaLoginService {
    //função para validar login quando usuario já esta logado e ao carregar as paginas dentro da aplicação
    //ela passa por um middleware que faz a validação, aqui é só a resposta
    verificaLogin() {
        return {
            message: "Login valido."
        }
    }
}
