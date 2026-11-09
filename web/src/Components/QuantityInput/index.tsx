import { Minus, Plus } from "phosphor-react";
import { IconWrapper, QuantityContainer } from "./styles";

interface quantityInputProps{
    onIncrease: () => void,
    onDecrease: () => void,
    quantity: number,
}

export function QuantityInput({onIncrease, onDecrease, quantity } : quantityInputProps) {
    return(
        <QuantityContainer>
            <IconWrapper  onClick={onDecrease} disabled={quantity <= 1} >
                <Minus size={14} weight="fill" />
            </IconWrapper>
            <input type="number" readOnly value={quantity}/>
            <IconWrapper>
            <Plus onClick={onIncrease}  size={14} weight="fill"/>
            </IconWrapper>
        </QuantityContainer>
    )
}