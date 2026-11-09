import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  padding: 1.5rem 1.25rem;
  color: ${({ theme }) => theme.colors["base-label"]};
  background: ${({ theme }) => theme.colors["base-card"]};
`;

export const FooterInner = styled.div`
  width: 100%;
  max-width: 70rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};

  @media (max-width: 34rem) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const FooterLink = styled.a`
  padding: 0.65rem 0.85rem;
  border-radius: 6px;
  color: ${({ theme }) => theme.colors["brand-purple-dark"]};
  background: ${({ theme }) => theme.colors["brand-purple-light"]};
  font-weight: 700;
`;
