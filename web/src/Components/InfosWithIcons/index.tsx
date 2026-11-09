import { ReactNode } from "react";
import { IconContainer, InfoWithContainer } from "./styles";

interface infoWithIconProps{
    icon: ReactNode,
    text: string | ReactNode;
    iconBg: string

}

export function InfoWithIcon({icon, text, iconBg} : infoWithIconProps) {
  return (
  <>
  <InfoWithContainer>
    <IconContainer iconBg={iconBg}>{icon}</IconContainer>
    {text}
  </InfoWithContainer>
  </>
  )
}
