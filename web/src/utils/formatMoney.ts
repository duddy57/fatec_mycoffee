export function FormatNumber(value:number) {
    return value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
    
    })
}