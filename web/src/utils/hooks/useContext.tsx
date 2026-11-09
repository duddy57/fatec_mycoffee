import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
export function UseCart() {
    const context = useContext(CartContext);
    return  context
}