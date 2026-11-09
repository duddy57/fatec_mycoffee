import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes/routes";
import { CartContextProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { DeliveryLocationProvider } from "./context/DeliveryLocationContext";
import type { ComponentType, PropsWithChildren } from "react";

const CompatibleThemeProvider = ThemeProvider as unknown as ComponentType<
  PropsWithChildren<{ theme: typeof defaultTheme }>
>;
const CompatibleGlobalStyle = GlobalStyle as unknown as ComponentType;

export function App() {
  return (
    <CompatibleThemeProvider theme={defaultTheme}>
      <CompatibleGlobalStyle />

      <BrowserRouter>
        <DeliveryLocationProvider>
          <AuthProvider>
            <CartContextProvider>
              <Router />
            </CartContextProvider>
          </AuthProvider>
        </DeliveryLocationProvider>
      </BrowserRouter>
    </CompatibleThemeProvider>
  );
}
