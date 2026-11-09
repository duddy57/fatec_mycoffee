import { RegularText, TitleText } from "../../../Components/Header/Typography";
import { UseCart } from "../../../utils/hooks/useContext";
import { CoffeeCartCard } from "../CoffeeCart";
import { ConfirmationSection } from "./ConfirmationSection";
import { DetailsContainer, SelectedCoffeesContainer } from "./style";
import emptyCart from "./../../../assets/empty-card.svg"
import { ButtonConfirm } from "../../../Components/Button";
import { NavLink } from "react-router-dom";
export function SelectedCoffees({ submitting, submitError }: { submitting: boolean; submitError: string }) {
    const {cartItems} = UseCart();
    const {cartItemsTotal} = UseCart();
    
    if(cartItems.length >=1 ){
        return(
        <SelectedCoffeesContainer>
        <TitleText size="xs" color="subtitle">
            Cafés Selecionados
        </TitleText>
        <DetailsContainer>
         
        {cartItems.map((item) => (
          <CoffeeCartCard key={item.id} coffee={item} />
        ))}
          

            <ConfirmationSection submitting={submitting} submitError={submitError} />
        </DetailsContainer>
        
    </SelectedCoffeesContainer>
        )
    } else{
        return(
            <SelectedCoffeesContainer>
            <TitleText size="xs" color="subtitle">
                Cafés Selecionados
            </TitleText>
            <DetailsContainer>
            
            <RegularText size="s" >Carrinnho Vazio! </RegularText>
            <img  src={emptyCart} className="empty"/>
            <NavLink to={"/"} className="navlink">
     <ButtonConfirm text={"Selecionar Cafés"}/>
                </NavLink>
            </DetailsContainer>
            
        </SelectedCoffeesContainer>
        )
    }
 
}
