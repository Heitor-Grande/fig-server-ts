import { compareSync, genSaltSync, hashSync } from "bcrypt-ts"
//o que é um hash?
//=> é projetado para converter um valor (como uma senha) em um código que não pode ser decodificado para o valor original
//função para gerar hash
function gerarHash(info: string) {
    try {
        //salt => numero de caracteres aleatorios que vai se unir com a minha info
        const salt = genSaltSync(10)
        //gerando o hash da info
        const hash = hashSync(info, salt)
        //retornando a info criptografada
        return {
            infoCriptografada: hash,
            salt: salt
        }
    } catch (error) {
        console.error("Erro ao gerar Hash: " + error)
        //disparo erro para cair no catch da função chamadora
        throw new Error("Erro ao gerar Hash.")
    }
}
//validar hash
function validarHash(info: string, hash: string) {
    try {
        //verifica se a info é compativel com o hash armazenado no banco
        if (compareSync(info, hash)) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        console.error("Erro ao validar hash: " + error)
        //disparo erro para cair no catch da função chamadora
        throw new Error("Erro ao validar hash.")
    }
}
//função para criptografar informações
export default {
    gerarHash,
    validarHash
}