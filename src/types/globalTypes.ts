import { PushSubscription } from "web-push"

export interface LembreteType {
    id: string
    idusuario: string
    titulo: string
    dataCriacao: string
    descricao: string
    dataDoDisparo: string // formato: "YYYY-MM-DDTHH:mm"
    recorrencia: "Semanal" | "Diario" | "Mensal" | "Anual" | "Unico"
    readOnly: boolean
}

export interface incricaoPushBodyType{
    idusuario: string
    inscricao: PushSubscription
}

export interface notifyType {
    title: string,
    body: string,
    data: object
}


export interface typeModalLoadType {
    carregando: boolean, mensagem: string
}