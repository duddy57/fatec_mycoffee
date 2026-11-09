import { useTheme } from "styled-components";
import { RegularText, TitleText } from "../../Components/Header/Typography";
import { DeliveryContainer, OrderDetailsContainer } from "./style";
import GuyOnABike from "../../assets/Illustration.png";
import { IconContainer } from "../../Components/InfosWithIcons/styles";
import { InfoWithIcon } from "../../Components/InfosWithIcons";
import { Clock, CurrencyCircleDollar, MapPin } from "phosphor-react";
import { NavLink, useLocation } from "react-router-dom";
import type { PedidoRespostaDto } from "../../services/api";


interface LocationType{
  state: PedidoRespostaDto
}
export function Delivery() {
  const { colors } = useTheme();
  const {state} = useLocation() as unknown as LocationType;
  if (!state) {
    return <DeliveryContainer className="container"><div><TitleText size="l">Nenhum pedido selecionado</TitleText><NavLink to="/catalogo">Ver catálogo</NavLink></div></DeliveryContainer>;
  }
  const address = state?.endereco;

  return (
    <DeliveryContainer className="container">
      <div>
        <TitleText size="l">Ihu, seu pedido foi confirmado</TitleText>
        <RegularText size="s" color="subtitle">
          Agora é só aguardar
        </RegularText>
      </div>

      <section>
        <OrderDetailsContainer>
          <InfoWithIcon
            icon={<MapPin weight="fill" />}
            text={
              <RegularText size="s">
                 Entrega em {address?.logradouro}, {address?.numero} <br />
                 <strong>{address?.cidade} - {address?.uf}</strong>
              </RegularText>
            }
            iconBg={colors["brand-purple-dark"]}
          />
          <InfoWithIcon
            icon={<Clock weight="fill" />}
            text={
                 <RegularText >
                 Previsão de entrega <br /> <strong>{state.previsaoMin}-{state.previsaoMax} minutos</strong>
              </RegularText>
            }
            iconBg={colors["brand-yellow"]}
          />
          <InfoWithIcon
            icon={<CurrencyCircleDollar weight="fill" />}
            text={
              <RegularText size="s" color="subtitle">
                 Forma de pagamento <br /> <strong>{state.formaPagamento.descricao}</strong>
              </RegularText>
            }
            iconBg={colors["brand-yellow-dark"]}
          />
        </OrderDetailsContainer>
        <img src={GuyOnABike} />
      </section>
    </DeliveryContainer>
  );
}
