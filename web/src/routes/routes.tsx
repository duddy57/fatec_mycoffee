import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "../layout";

import { CartPage } from "../Pages/CompleteOrder";
import { Delivery } from "../Pages/Delivery";
import { Homepage } from "../Pages/Home";
import { RequireAuth, RequireRole } from "../context/AuthContext";
import { Papel } from "../services/api";
import { Login, Register } from "../Pages/Auth";
import { AdminDashboard, AdminCatalog, AdminOrders, AdminUsers } from "../Pages/Admin";

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/catalogo" element={<Homepage />} />
        <Route path="/completeOrder" element={<RequireAuth><CartPage /></RequireAuth>} />
        <Route path="/Delivery" element={<Delivery />} />
        <Route path="/admin" element={<RequireRole papeis={[Papel.ADMIN, Papel.FUNCIONARIO]}><AdminDashboard /></RequireRole>} />
        <Route path="/admin/cafes" element={<RequireRole papeis={[Papel.ADMIN, Papel.FUNCIONARIO]}><AdminCatalog /></RequireRole>} />
        <Route path="/admin/pedidos" element={<RequireRole papeis={[Papel.ADMIN, Papel.FUNCIONARIO]}><AdminOrders /></RequireRole>} />
        <Route path="/admin/usuarios" element={<RequireRole papeis={[Papel.ADMIN]}><AdminUsers /></RequireRole>} />
      </Route>
    </Routes>
  );
}
