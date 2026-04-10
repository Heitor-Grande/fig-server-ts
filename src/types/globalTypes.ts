import { PushSubscription } from "web-push"

export interface LembreteType {
    id: string
    titulo: string
    dataCriacao: string
    descricao: string
    dataDoDisparo: string // "YYYY-MM-DDThh:mm:ss"
    recorrencia: "Diario" | "Unico"
    readOnly: boolean
    disparado: boolean
}

export interface incricaoPushBodyType {
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

export interface diaAgendaType {
    id: string;
    horaInicio: string;
    horaFim: string;
    dia: string;
    mes: string;
    ano: string;
    nomeCompleto: string;
    celular: string;
    email: string
    cpf: string
    observacao: string
    status: string
}

export interface agendaDiaProps {

    dia: string;
    mes: string;
    ano: string;
}