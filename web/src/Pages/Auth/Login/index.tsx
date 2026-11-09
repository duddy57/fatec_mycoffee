import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "../../../Components/Input";
import { ButtonConfirm } from "../../../Components/Button";
import { useAuth } from "../../../context/AuthContext";
import { AuthAside, AuthForm, AuthLink, AuthPage, AuthShell, FormField, FormNotice } from "../styles";

export function Login() {
  const navigate = useNavigate();
  const { login, carregando } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Informe seu e-mail e sua senha.");
      return;
    }
    try {
      await login({ email: email.trim(), senha: password });
      navigate("/");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível entrar.");
    }
  }

  return (
    <AuthPage>
      <AuthShell>
        <AuthAside>
          <h1>Seu café começa aqui.</h1>
          <p>Entre para acompanhar pedidos e repetir seus favoritos.</p>
        </AuthAside>
        <AuthForm onSubmit={handleSubmit} noValidate>
          <h2>Entrar</h2>
          {error && <FormNotice role="alert">{error}</FormNotice>}
          <FormField>
            E-mail
            <InputText type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="voce@exemplo.com" autoComplete="email" />
          </FormField>
          <FormField>
            Senha
            <InputText type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Sua senha" autoComplete="current-password" />
          </FormField>
          <ButtonConfirm type="submit" text={carregando ? "Entrando..." : "Entrar"} disabled={carregando} />
          <AuthLink as={Link} to="/cadastro">Ainda não tenho conta</AuthLink>
        </AuthForm>
      </AuthShell>
    </AuthPage>
  );
}
