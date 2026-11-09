import { ShoppingCart } from "phosphor-react";
import {
  RegularText,
  TitleText,
} from "../../../../Components/Header/Typography";
import { QuantityInput } from "../../../../Components/QuantityInput";
import { FormatNumber } from "../../../../utils/formatMoney";
import {
  CoffeeCardContainer,
  Description,
  Name,
  Tags,
  CardFooter,
  AddCartWrapper,
} from "./styles";
import { UseCart } from "../../../../utils/hooks/useContext";
import { useState, type SyntheticEvent } from "react";
import type { Cafe } from "../../../../services/api";
import CoffeeCup from "../../../../assets/coffee-cup.png";

const coffeeImages: Record<number, string> = {
  1: "tradicional.png",
  2: "americano.png",
  3: "cremoso.png",
  4: "gelado.png",
  5: "leite.png",
  6: "latte.png",
  7: "capuccino.png",
  8: "macchiato.png",
  9: "mocaccino.png",
  10: "chocolate.png",
  11: "cubano.png",
  12: "havaiano.png",
  13: "arabe.png",
  14: "irlandes.png",
  15: "frappucino.png",
};

export function coffeeFallbackImage(id: number) {
  const filename = coffeeImages[id];
  return filename ? `/coffees/${filename}` : CoffeeCup;
}
export interface Coffee extends Cafe {
  price: number;
  name?: string;
  photo?: string;
}

interface CoffeeProps {
  coffee: Coffee;
}

export function CoffeeCards({ coffee }: CoffeeProps) {
  const [ quantity, setQuantity ] = useState(1);
  const { addCoffeeToCart } = UseCart();

  function handleAddToCart() {
    const coffeeToAdd = {
      ...coffee,
      name: coffee.nome,
      photo: coffee.imagemUrl,
      quantity,
      
    };
    addCoffeeToCart(coffeeToAdd);
  }
  function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
    const fallback = coffeeFallbackImage(coffee.id);
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallback;
  }
function handleIncrease() {
    setQuantity((state) => state + 1)
  }

  function handleDecrease() {
    setQuantity((state) => Math.max(1, state - 1))
  }


  const formattedPrice = FormatNumber(coffee.price);
  return (
    <CoffeeCardContainer>
       <img src={coffee.imagemUrl} alt={coffee.nome} onError={handleImageError} />
      <Tags>
        {coffee.tags.map((tag) => (
          <span key={`${coffee.id}${tag.id}`}>{tag.nome}</span>
        ))}
      </Tags>

      <Name>{coffee.nome}</Name>
      <Description>{coffee.descricao}</Description>
      <CardFooter>
        <div>
          <RegularText size="s">R$</RegularText>
          <TitleText size="m" color="text" as="strong">
            {formattedPrice}
          </TitleText>
          <AddCartWrapper></AddCartWrapper>
        </div>
        <AddCartWrapper>
          <QuantityInput 
          onIncrease = {handleIncrease}
          onDecrease = {handleDecrease}
          quantity = {quantity}
          />
          <button onClick={handleAddToCart}>
            <ShoppingCart size={22} weight="fill" />
          </button>
        </AddCartWrapper>
      </CardFooter>
    </CoffeeCardContainer>
  );
}
