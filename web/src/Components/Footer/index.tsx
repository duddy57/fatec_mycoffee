import { Link } from "react-router-dom";
import { FooterContainer, FooterInner, FooterLink } from "./styles";
import { useAuth } from "../../context/AuthContext";
import { Papel } from "../../services/api";

export function Footer() {
  const { usuario } = useAuth();
  const podeAcessarAdministracao = usuario?.papel === Papel.FUNCIONARIO || usuario?.papel === Papel.ADMIN;
  return <FooterContainer><FooterInner><span>MyCoffee Delivery</span>{podeAcessarAdministracao && <FooterLink as={Link} to="/admin">Área administrativa</FooterLink>}</FooterInner></FooterContainer>;
}
