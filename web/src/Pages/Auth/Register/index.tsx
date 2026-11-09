import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "../../../Components/Input";
import { ButtonConfirm } from "../../../Components/Button";
import { useAuth } from "../../../context/AuthContext";
import { AuthAside, AuthForm, AuthLink, AuthPage, AuthShell, FormNotice, FormField } from "../styles";

export function Register() {
  const navigate = useNavigate();
  const { cadastrar, carregando } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmation: "" });
  const [error, setError] = useState("");
  const update = (field: keyof typeof form) => (value: string) => setForm((current) => ({ ...current, [field]: value }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.password) return setError("Preencha os campos obrigatórios.");
    if (!/^(?=.*[A-Za-z])(?=.*\d).{8,72}$/.test(form.password)) return setError("A senha deve ter de 8 a 72 caracteres, uma letra e um número.");
    if (form.password !== form.confirmation) return setError("As senhas não conferem.");
    try {
      await cadastrar({ nome: form.name.trim(), email: form.email.trim(), senha: form.password, telefone: form.phone.trim() || undefined });
      navigate("/");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível criar sua conta.");
    }
  }

  return (
    <AuthPage>
      <AuthShell>
        <AuthAside>
          <h1>Uma pausa feita para você.</h1>
          <p>Crie sua conta e receba seus cafés sem sair do ritmo.</p>
        </AuthAside>
        <AuthForm onSubmit={handleSubmit} noValidate>
          <h2>Criar conta</h2>
          {error && <FormNotice role="alert">{error}</FormNotice>}
          <FormField>Nome<InputText value={form.name} onChange={(event) => update("name")(event.target.value)} autoComplete="name" /></FormField>
          <FormField>E-mail<InputText type="email" value={form.email} onChange={(event) => update("email")(event.target.value)} autoComplete="email" /></FormField>
          <FormField>Telefone<InputText value={form.phone} onChange={(event) => update("phone")(event.target.value)} autoComplete="tel" /></FormField>
          <FormField>Senha<InputText type="password" value={form.password} onChange={(event) => update("password")(event.target.value)} autoComplete="new-password" /></FormField>
          <FormField>Confirmar senha<InputText type="password" value={form.confirmation} onChange={(event) => update("confirmation")(event.target.value)} autoComplete="new-password" /></FormField>
          <ButtonConfirm type="submit" text={carregando ? "Criando..." : "Criar conta"} disabled={carregando} />
          <AuthLink as={Link} to="/login">Já tenho uma conta</AuthLink>
        </AuthForm>
      </AuthShell>
    </AuthPage>
  );
}
