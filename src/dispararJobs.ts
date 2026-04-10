import { atualizaLembretesDiariosParaDisparadoFalse, jobDispararLembretes, limparLembretesUnicosDisparados } from "./utils/jobLembretes"

export default function dispararJobs() {

    //disparos dos lembretes
    setInterval(async function () {

        await jobDispararLembretes()
    }, 30000) // a cada 30 segundos

    //atualiza lembretes diarios para disparado = false
    setInterval(async function () {

        await atualizaLembretesDiariosParaDisparadoFalse()
    }, 60000) //a cada 1 minutos

    // delete dos lembretes únicos já disparados, a cada 3 dias
    setInterval(async function () {
        
        await limparLembretesUnicosDisparados()
    }, 259200000) // a cada 3 dias
}