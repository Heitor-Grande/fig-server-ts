export default function somenteNumeros(valor: string): string {
    return valor.replace(/\D/g, '');
}