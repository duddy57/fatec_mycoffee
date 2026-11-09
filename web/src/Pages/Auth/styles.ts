import styled from "styled-components";

export const AuthPage = styled.main`
  min-height: calc(100vh - 6.5rem);
  display: grid;
  place-items: center;
  padding: 3rem 1.25rem 5rem;
`;

export const AuthShell = styled.section`
  width: 100%;
  max-width: 58rem;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(20rem, 1fr);
  background: ${({ theme }) => theme.colors["base-white"]};
  box-shadow: 0 1rem 3rem rgba(39, 34, 33, 0.08);
  border-radius: 6px 36px 6px 36px;
  overflow: hidden;

  @media (max-width: 42rem) {
    grid-template-columns: 1fr;
  }
`;

export const AuthAside = styled.aside`
  min-height: 28rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 2.5rem;
  color: ${({ theme }) => theme.colors["base-white"]};
  background: linear-gradient(145deg, ${({ theme }) => theme.colors["brand-purple-dark"]}, ${({ theme }) => theme.colors["brand-purple"]});

  h1 {
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: ${({ theme }) => theme.textSizes["title-title-l"]};
  }

  p {
    color: ${({ theme }) => theme.colors["brand-purple-light"]};
    line-height: 1.5;
  }

  @media (max-width: 42rem) {
    min-height: 12rem;
    padding: 2rem;
  }
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2.5rem;

  h2 {
    color: ${({ theme }) => theme.colors["base-title"]};
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: ${({ theme }) => theme.textSizes["title-title-m"]};
  }

  @media (max-width: 42rem) {
    padding: 2rem;
  }
`;

export const FormField = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  color: ${({ theme }) => theme.colors["base-subtitle"]};
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
`;

export const FormError = styled.p`
  color: ${({ theme }) => theme.colors["base-error"]};
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
`;

export const FormNotice = styled.p`
  padding: 0.75rem;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors["brand-yellow-light"]};
  color: ${({ theme }) => theme.colors["brand-yellow-dark"]};
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
`;

export const AuthLink = styled.a`
  align-self: center;
  color: ${({ theme }) => theme.colors["brand-purple-dark"]};
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  font-weight: 700;
`;
