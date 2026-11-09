import { useEffect, useState } from "react";
import api, { PedidoRespostaDto, StatusPedido } from "../../../services/api";
import { AdminAccess, AdminFrame } from "../shared";
import { ActionButton, AdminMessage, AdminPanel, Status, Table, TableWrap } from "../styles";

export function AdminOrders() {
  const [orders, setOrders] = useState<PedidoRespostaDto[]>([]);
  const [state, setState] = useState("loading");
  const load = () => { setState("loading"); api.listarPedidos().then((items) => { setOrders(items); setState(items.length ? "ready" : "empty"); }).catch(() => setState("error")); };
  useEffect(load, []);
  async function update(code: string, status: StatusPedido) { await api.atualizarStatusPedido(code, { status }); load(); }
  return <AdminAccess><AdminFrame title="Pedidos" description="Acompanhe e atualize os pedidos em andamento."><AdminPanel>{state === "loading" && <AdminMessage>Carregando pedidos...</AdminMessage>}{state === "error" && <AdminMessage error role="alert">Não foi possível carregar os pedidos.</AdminMessage>}{state === "empty" && <AdminMessage>Nenhum pedido encontrado.</AdminMessage>}{state === "ready" && <TableWrap><Table><thead><tr><th>Pedido</th><th>Cliente</th><th>Total</th><th>Status</th><th>Ação</th></tr></thead><tbody>{orders.map((order) => <tr key={order.codigo}><td><strong>#{order.codigo}</strong></td><td>{order.cliente?.nome || "Cliente"}</td><td>R$ {order.total.toFixed(2).replace(".", ",")}</td><td><Status>{order.status.replaceAll("_", " ")}</Status></td><td>{order.status === "CONFIRMADO" && <ActionButton onClick={() => update(order.codigo, "EM_PREPARO")}>Preparar</ActionButton>}{order.status === "EM_PREPARO" && <ActionButton onClick={() => update(order.codigo, "SAIU_PARA_ENTREGA")}>Enviar</ActionButton>}{order.status === "SAIU_PARA_ENTREGA" && <ActionButton onClick={() => update(order.codigo, "ENTREGUE")}>Concluir</ActionButton>}</td></tr>)}</tbody></Table></TableWrap>}</AdminPanel></AdminFrame></AdminAccess>;
}
