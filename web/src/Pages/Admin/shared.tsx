import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Papel } from "../../services/api";
import { AccessMessage, AdminHeader, AdminNav, AdminPage } from "./styles";

export function AdminAccess({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) {
  const { usuario, carregando } = useAuth();
  if (carregando) return <AccessMessage><h1>Carregando acesso</h1><p>Estamos validando sua sessão.</p></AccessMessage>;
  if (!usuario) return <AccessMessage><h1>Entre para continuar</h1><p>Esta área exige uma conta autenticada.</p><Link to="/login">Ir para o login</Link></AccessMessage>;
  const allowed = adminOnly ? usuario.papel === Papel.ADMIN : usuario.papel === Papel.ADMIN || usuario.papel === Papel.FUNCIONARIO;
  if (!allowed) return <AccessMessage><h1>Acesso restrito</h1><p>Seu perfil não pode acessar esta área.</p></AccessMessage>;
  return <>{children}</>;
}

export function AdminFrame({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  const { usuario } = useAuth();
  return <AdminPage><AdminHeader><div><h1>{title}</h1><p>{description}</p></div></AdminHeader><AdminNav><NavLink to="/admin" end>Visão geral</NavLink><NavLink to="/admin/cafes">Cafés</NavLink><NavLink to="/admin/pedidos">Pedidos</NavLink>{usuario?.papel !== Papel.FUNCIONARIO && <NavLink to="/admin/usuarios">Usuários</NavLink>}</AdminNav>{children}</AdminPage>;
}
