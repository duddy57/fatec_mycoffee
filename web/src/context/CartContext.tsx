import produce from "immer";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Coffee } from "../Pages/Home/components/CoffeeCard";

export interface CartItem extends Coffee {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addCoffeeToCart: (coffee: CartItem) => void;
  CartQuantity: number;
  changeCartItemQuantity: (
    cartItemId: number,
    type: "increase" | "decrease"
  ) => void;
  deleteItemCart: (cartItemId: number) => void,
  cartItemsTotal: number,
  ClearCart: () => void
}

interface CartContextProviderProps {
  children: ReactNode;
}

const COFFEE_ITEMS_STORAGE_KEY = "coffee/delivery:cartItems"
export const CartContext = createContext({} as CartContextType);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = localStorage.getItem(COFFEE_ITEMS_STORAGE_KEY)
    if(storedCartItems){
        return JSON.parse(storedCartItems)
    }
    return []
  });
  const CartQuantity = cartItems.length;
  const cartItemsTotal = cartItems.reduce((total, cartItem) => {
    return total + cartItem.price * cartItem.quantity
  }, 0)

  function addCoffeeToCart(coffee: CartItem) {
    const coffeeAlreadyExistInCart = cartItems.findIndex(
      (cartItem) => cartItem.id === coffee.id
    );
    const newCart = produce(cartItems, (draft) => {
      if (coffeeAlreadyExistInCart < 0) {
        draft.push(coffee);
      } else {
        draft[coffeeAlreadyExistInCart].quantity += coffee.quantity;
      }
    });
    setCartItems(newCart);
  }

  function changeCartItemQuantity(
    cartItemId: number,
    type: "increase" | "decrease"
  ) {
    const newCart = produce(cartItems, (draft) => {
      const coffeeExistInCart = cartItems.findIndex(
        (cartItem) => cartItem.id === cartItemId
      );

      if (coffeeExistInCart >= 0) {
        const item = draft[coffeeExistInCart];
        if (type === "decrease" && item.quantity <= 1) {
          draft.splice(coffeeExistInCart, 1);
        } else {
          draft[coffeeExistInCart].quantity =
            type === "increase" ? item.quantity + 1 : item.quantity - 1;
        }
      }
    });
    setCartItems(newCart);
  }

  function deleteItemCart(cartItemId: number) {
    const newCart = produce(cartItems, (draft) => {
      const coffeeExistInCart = cartItems.findIndex(
        (cartItem) => cartItem.id === cartItemId
      );

      if (coffeeExistInCart >= 0) {
        draft.splice(coffeeExistInCart, 1)
      }
    });
    setCartItems(newCart);
  }

  function ClearCart() {
    setCartItems([])
  }
useEffect(() => {
    localStorage.setItem(COFFEE_ITEMS_STORAGE_KEY, JSON.stringify(cartItems))
}, [cartItems])
  return (
    <CartContext.Provider
      value={{
        cartItems,
        CartQuantity,
        addCoffeeToCart,
        changeCartItemQuantity,
        deleteItemCart,
        cartItemsTotal,
         ClearCart
        
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
