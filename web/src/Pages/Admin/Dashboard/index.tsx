import { useEffect, useState } from "react";
import api from "../../../services/api";
import { AdminAccess, AdminFrame } from "../shared";
import { AdminMessage, AdminPanel, SummaryCard, SummaryGrid } from "../styles";

export function AdminDashboard() {
  const [counts, setCounts] = useState({ cafes: 0, orders: 0, users: 0 });
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  useEffect(() => {
    let active = true;
    Promise.all([api.listarCafesGestao(), api.listarPedidos(), api.listarUsuarios()]).then(([cafes, orders, users]) => {
      if (active) { setCounts({ cafes: cafes.length, orders: orders.length, users: users.length }); setState("ready"); }
    }).catch(() => active && setState("error"));
    return () => { active = false; };
  }, []);
  return <AdminAccess><AdminFrame title="Visão geral" description="Acompanhe a operação da cafeteria.">{state === "loading" && <AdminMessage>Carregando dados...</AdminMessage>}{state === "error" && <AdminMessage error role="alert">Não foi possível carregar o painel.</AdminMessage>}{state === "ready" && <SummaryGrid><SummaryCard><strong>{counts.cafes}</strong><span>Cafés cadastrados</span></SummaryCard><SummaryCard><strong>{counts.orders}</strong><span>Pedidos recentes</span></SummaryCard><SummaryCard><strong>{counts.users}</strong><span>Usuários</span></SummaryCard></SummaryGrid>}<AdminPanel><h2>Próximos passos</h2><p>Use a navegação para atualizar o catálogo, acompanhar pedidos e gerir acessos.</p></AdminPanel></AdminFrame></AdminAccess>;
}
