import connection from "src/database/connection"
import notify from "./notifyServiceWork"

//função para converter 28/02/2026, 10:15:30 para Date
function converterLocaleStringParaDate(dataHora: string) {

    try {

        //pegando data e hora
        const [data, hora] = dataHora.split(" ")

        //pegando dia mes e ano da data
        const [dia, mes, ano] = data.replace(",", "").split("/")

        // Criando um objeto Date
        const dataHoraBrasilia = new Date(`${ano}-${mes}-${dia}T${hora}`)

        return dataHoraBrasilia

    } catch (error) {

        console.error("Erro ao formatar data String para Date()")
    }
}

//função para limpar os lembretes unicos, já disparados
export async function limparLembretesUnicosDisparados() {

    try {
        await connection.query(`
            DELETE FROM public.lembretes where recorrencia = 'Unico' and disparado = true
        `)
    } catch (error) {

        console.log("ERRO AO LIMPAR LEMBRETES DISPARADOS ---- inicio")
        console.log(error)
        console.log("ERRO AO LIMPAR LEMBRETES DISPARADOS ---- fim")
    }
}

//função que reseta lembretes diarios para disparado = false após meia noite
export async function atualizaLembretesDiariosParaDisparadoFalse() {

    try {

        //pego a data e hora do brasil Ex: 28/02/2026, 10:15:30
        const dataHoraAtualBrasilia = new Date().toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo"
        })

        const tempo = dataHoraAtualBrasilia.split(" ")[1] //10:15:30
        const [horas, minutos, segundos] = tempo.split(":")

        //se é maior que 00:00, preenche os lembretes Diarios com disparo = false
        if (parseInt(horas) == 0 && (parseInt(minutos) > 0 || parseInt(segundos) > 0)) {

            const sqlUpdate = `
            UPDATE public.lembretes
            SET 
             disparado = false
            WHERE recorrencia = 'Diario' and disparado = true
            `

            await connection.query(sqlUpdate)
        }
    } catch (error) {

        console.log("ERRO AO VERIFICAR MEIO NOITE -- INICIO")
        console.log(error)
        console.log("ERRO AO VERIFICAR MEIO NOITE -- FIM")
    }
}

//função para disparar os lembretes (web-push)
export async function jobDispararLembretes() {

    try {

        //pego a data e hora do brasil Ex: 28/02/2026, 10:15:30
        const dataHoraAtualBrasilia = new Date().toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo"
        })

        const dateAtualBarasilia = converterLocaleStringParaDate(dataHoraAtualBrasilia)

        const sqlSelectLembretes = `
        SELECT 
        l.idlembrete, l.idusuario, l.lembrete, l.descricao, l.datadodisparo, l.recorrencia, l.datacriacao, l.disparado,
        u.nome, u.email, i.inscricao 
        FROM public.lembretes l
        inner join public.usuario u on u.id_usuario = idusuario
        inner join public.inscricaopushuser i on i.userid = u.id_usuario 
        `

        const listaLembretes = (await connection.query(sqlSelectLembretes)).rows

        for (let i = 0; i < listaLembretes.length; i = i + 1) {

            const lembrete = listaLembretes[i]

            const DateLembrete = new Date(lembrete.datadodisparo)

            if (dateAtualBarasilia >= DateLembrete) {

                if (lembrete.recorrencia == "Unico" && lembrete.disparado == false) {

                    //dispara lembrete 
                    notify(lembrete.inscricao, {
                        title: lembrete.lembrete,
                        body: lembrete.descricao,
                        data: {
                            url: process.env.CLIENT + "/home/meus/lembretes"
                        }
                    })

                    const updateLembrete = `
                    UPDATE public.lembretes
                    SET 
                    disparado = true
                    WHERE idlembrete = $1 and idusuario = $2
                    `

                    await connection.query(updateLembrete, [lembrete.idlembrete, lembrete.idusuario])
                }
                else if (lembrete.recorrencia == "Diario" && lembrete.disparado == false) {

                    //dispara lembrete 
                    notify(lembrete.inscricao, {
                        title: lembrete.lembrete,
                        body: lembrete.descricao,
                        data: {
                            url: process.env.CLIENT + "/home/meus/lembretes"
                        }
                    })

                    const updateLembrete = `
                    UPDATE public.lembretes
                    SET 
                    disparado = true
                    WHERE idlembrete = $1 and idusuario = $2
                    `

                    await connection.query(updateLembrete, [lembrete.idlembrete, lembrete.idusuario])
                }
            }
        }



    } catch (error) {

        console.log("Erro ao executar Job para disparar Lembrete --- INICIO")
        console.error(error)
        console.log("Erro ao executar Job para disparar Lembrete --- FIM")
    }
}