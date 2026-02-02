import { AES, enc } from "crypto-ts"
//função para criptografar dados
function criptografar(info: string) {
    try {
        const infoCriptografada = AES.encrypt(info, process.env.KEY_CRYPTOJS).toString()
        return infoCriptografada
    } catch (error) {
        console.error(error)
        throw new Error("Erro ao criptografar informação.")
    }
}
//função para descriptografar
function descriptografar(infoCriptografada: string) {
    try {
        const infoDescriptografada = AES.decrypt(infoCriptografada, process.env.KEY_CRYPTOJS).toString(enc.Utf8)
        return infoDescriptografada
    } catch (error) {
        console.error(error)
        throw new Error("Erro ao descriptografarInformação")
    }
}
export default {
    criptografar, descriptografar
}