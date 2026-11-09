import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { api, configurarToken, type CadastroDto, type LoginDto, type Papel, type UsuarioRespostaDto } from "../services/api";

const SESSION_KEY = "mycoffee.auth.session";

type AuthSession = { token: string; usuario: UsuarioRespostaDto };

type AuthContextValue = {
  usuario: UsuarioRespostaDto | null;
  token: string | null;
  carregando: boolean;
  autenticado: boolean;
  login: (dados: LoginDto) => Promise<UsuarioRespostaDto>;
  cadastrar: (dados: CadastroDto) => Promise<UsuarioRespostaDto>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function lerSessao(): AuthSession | null {
  try {
    const valor = localStorage.getItem(SESSION_KEY);
    if (!valor) return null;
    const sessao = JSON.parse(valor) as Partial<AuthSession>;
    if (typeof sessao.token !== "string" || !sessao.usuario) return null;
    return sessao as AuthSession;
  } catch {
    return null;
  }
}

function salvarSessao(sessao: AuthSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessao));
  configurarToken(sessao.token);
}

function apagarSessao() {
  localStorage.removeItem(SESSION_KEY);
  configurarToken();
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [sessao, setSessao] = useState<AuthSession | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const sessaoSalva = lerSessao();
    if (!sessaoSalva) {
      setCarregando(false);
      return;
    }
    configurarToken(sessaoSalva.token);
    api.obterUsuarioAtual(sessaoSalva.token)
      .then((usuario) => setSessao({ token: sessaoSalva.token, usuario }))
      .catch(() => {
        apagarSessao();
        setSessao(null);
      })
      .finally(() => setCarregando(false));
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    usuario: sessao?.usuario ?? null,
    token: sessao?.token ?? null,
    carregando,
    autenticado: Boolean(sessao),
    login: async (dados) => {
      const resposta = await api.login(dados);
      const novaSessao = { token: resposta.accessToken, usuario: resposta.usuario };
      salvarSessao(novaSessao);
      setSessao(novaSessao);
      return resposta.usuario;
    },
    cadastrar: async (dados) => {
      const resposta = await api.cadastrarUsuario(dados);
      const novaSessao = { token: resposta.accessToken, usuario: resposta.usuario };
      salvarSessao(novaSessao);
      setSessao(novaSessao);
      return resposta.usuario;
    },
    logout: () => {
      apagarSessao();
      setSessao(null);
    },
  }), [carregando, sessao]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth precisa estar dentro de AuthProvider");
  return context;
}

export const UseAuth = useAuth;

export function RequireAuth({ children, papeis }: { children: React.ReactElement; papeis?: Papel[] }) {
  const { carregando, usuario } = useAuth();
  const location = useLocation();
  if (carregando) return null;
  if (!usuario) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (papeis && !papeis.includes(usuario.papel)) return <Navigate to="/" replace />;
  return children;
}

export function RequireRole({ children, papeis }: { children: React.ReactElement; papeis: Papel[] }) {
  return <RequireAuth papeis={papeis}>{children}</RequireAuth>;
}
