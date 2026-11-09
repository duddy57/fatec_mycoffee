import { ButtonConfirm } from "../../../Components/Button";
import { RegularText } from "../../../Components/Header/Typography";
import { UseCart } from "../../../utils/hooks/useContext";
import { ConfirmationSectionContainer } from "./style";
import { FormatNumber } from "../../../utils/formatMoney";

export function ConfirmationSection({ submitting, submitError }: { submitting: boolean; submitError: string }) {
  
      const {cartItemsTotal} = UseCart();
      const formatedPrice = FormatNumber(cartItemsTotal);
 
            return(
                <ConfirmationSectionContainer>
                <div>
                    <RegularText size="s">Total de itens</RegularText>
                    <RegularText>{formatedPrice}</RegularText>
                </div>
                {submitError && <RegularText role="alert">{submitError}</RegularText>}
                <ButtonConfirm text={submitting ? "Confirmando..." : "Confirmar Pedido"} type="submit" disabled={submitting}/>
            </ConfirmationSectionContainer>
            )
         
         
            
        
 
    
}
