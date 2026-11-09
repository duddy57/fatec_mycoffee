import { Outlet } from "react-router-dom";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";
import { LayoutContainer } from "./styles";

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header/ >
      <main>
        <Outlet />
      </main>
      <Footer />
    </LayoutContainer>
  );
}
