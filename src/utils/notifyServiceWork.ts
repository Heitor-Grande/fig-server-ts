import { notify } from 'src/types/globalTypes';
import { PushSubscription, sendNotification, setVapidDetails } from 'web-push';

//faz uma validação do meu web-push
setVapidDetails(
    process.env.USER_SMTP!,
    process.env.VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!,
)

export default async function notify(subscription: PushSubscription, notificacao: notify) {

    const notificacaoFormatada = JSON.stringify(notificacao)


    return sendNotification(subscription, notificacaoFormatada)
}