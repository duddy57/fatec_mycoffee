import { useEffect, useState } from "react";
import api, { Papel, UsuarioRespostaDto } from "../../../services/api";
import { AdminAccess, AdminFrame } from "../shared";
import { ActionButton, AdminMessage, AdminPanel, Status, Table, TableWrap } from "../styles";

export function AdminUsers() {
  const [users, setUsers] = useState<UsuarioRespostaDto[]>([]);
  const [state, setState] = useState("loading");
  const load = () => { setState("loading"); api.listarUsuarios().then((items) => { setUsers(items); setState(items.length ? "ready" : "empty"); }).catch(() => setState("error")); };
  useEffect(load, []);
  async function toggle(user: UsuarioRespostaDto) { await api.atualizarUsuario(user.id, { ativo: !user.ativo }); load(); }
  async function changeRole(user: UsuarioRespostaDto, papel: Papel) { await api.atualizarUsuario(user.id, { papel }); load(); }
  return <AdminAccess adminOnly><AdminFrame title="Usuários" description="Gerencie os perfis e os acessos da equipe."><AdminPanel>{state === "loading" && <AdminMessage>Carregando usuários...</AdminMessage>}{state === "error" && <AdminMessage error role="alert">Não foi possível carregar os usuários.</AdminMessage>}{state === "empty" && <AdminMessage>Nenhum usuário encontrado.</AdminMessage>}{state === "ready" && <TableWrap><Table><thead><tr><th>Nome</th><th>E-mail</th><th>Perfil</th><th>Status</th><th>Ações</th></tr></thead><tbody>{users.map((user) => <tr key={user.id}><td><strong>{user.nome}</strong></td><td>{user.email}</td><td><select value={user.papel} onChange={(event) => changeRole(user, event.target.value as Papel)}><option value={Papel.CLIENTE}>Cliente</option><option value={Papel.FUNCIONARIO}>Funcionário</option><option value={Papel.ADMIN}>Admin</option></select></td><td><Status>{user.ativo ? "Ativo" : "Inativo"}</Status></td><td><ActionButton onClick={() => toggle(user)}>{user.ativo ? "Desativar" : "Ativar"}</ActionButton></td></tr>)}</tbody></Table></TableWrap>}</AdminPanel></AdminFrame></AdminAccess>;
}
