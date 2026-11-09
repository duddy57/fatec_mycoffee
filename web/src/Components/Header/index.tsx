import { HeaderButton, HeaderButtonContainer, HeaderLayout } from "./styles";
import CoffeeDeliveryLogo from "../../assets/CoffeeDeliveryLogo.png";
import { MapPin, ShoppingCart, SignIn, SignOut } from "phosphor-react";
import { NavLink } from "react-router-dom";
import { UseCart } from "../../utils/hooks/useContext";
import { useAuth } from "../../context/AuthContext";
import { useDeliveryLocation } from "../../context/DeliveryLocationContext";
import {
  LocationButton,
  LocationPicker,
  LocationText,
} from "../LocationPicker";

export function Header() {
  const { CartQuantity } = UseCart();
  const { usuario, logout } = useAuth();
  const { location, openPicker } = useDeliveryLocation();
  return (
    <HeaderLayout>
      <div className="container">
        <NavLink to="/">
          <img src={CoffeeDeliveryLogo} alt="Fallback banner" />
        </NavLink>
        <HeaderButtonContainer>
          {usuario ? (
            <HeaderButton variant="purple" onClick={logout} title="Sair">
              <SignOut size={20} weight="fill" />
            </HeaderButton>
          ) : (
            <NavLink to="/login">
              <HeaderButton variant="purple" title="Entrar">
                <SignIn size={20} weight="fill" />
              </HeaderButton>
            </NavLink>
          )}

          <LocationButton
            type="button"
            onClick={openPicker}
            title="Alterar localização"
          >
            <MapPin size={20} weight="fill" />
            <LocationText>
              {location
                ? `${location.localidade}, ${location.uf}`
                : "Definir localização"}
            </LocationText>
          </LocationButton>

          <NavLink to="/completeOrder">
            <HeaderButton variant="yellow">
              {CartQuantity >= 1 && <span>{CartQuantity}</span>}
              <ShoppingCart size={20} weight="fill" />
            </HeaderButton>
          </NavLink>
        </HeaderButtonContainer>
      </div>
      <LocationPicker />
    </HeaderLayout>
  );
}
