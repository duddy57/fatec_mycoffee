import styled from "styled-components";

export const AdminPage = styled.main`
  width: 100%;
  max-width: 70rem;
  margin: 0 auto;
  padding: 3.5rem 1.25rem 6rem;
`;

export const AdminHeader = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;

  h1 {
    color: ${({ theme }) => theme.colors["base-title"]};
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: ${({ theme }) => theme.textSizes["title-title-l"]};
  }

  p {
    margin-top: 0.35rem;
    color: ${({ theme }) => theme.colors["base-label"]};
    font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  }

  @media (max-width: 42rem) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const AdminNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;

  a {
    padding: 0.7rem 0.95rem;
    border-radius: 6px;
    color: ${({ theme }) => theme.colors["base-text"]};
    background: ${({ theme }) => theme.colors["base-white"]};
    font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
    font-weight: 700;
  }

  a[aria-current="page"] {
    color: ${({ theme }) => theme.colors["base-white"]};
    background: ${({ theme }) => theme.colors["brand-purple-dark"]};
  }
`;

export const AdminPanel = styled.section`
  padding: 1.5rem;
  border-radius: 6px 30px 6px 30px;
  background: ${({ theme }) => theme.colors["base-white"]};
  box-shadow: 0 0.75rem 2rem rgba(39, 34, 33, 0.06);
`;

export const CatalogGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(15rem, 0.8fr) minmax(0, 1.2fr);
  gap: 1.25rem;
  align-items: start;

  @media (max-width: 52rem) {
    grid-template-columns: 1fr;
  }
`;

export const FormPanel = styled(AdminPanel)`
  h2 {
    margin-bottom: 0.35rem;
    color: ${({ theme }) => theme.colors["base-title"]};
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: ${({ theme }) => theme.textSizes["title-title-m"]};
  }

  > p {
    margin-bottom: 1.25rem;
    color: ${({ theme }) => theme.colors["base-label"]};
    font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
    line-height: 1.5;
  }
`;

export const AdminForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

export const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  color: ${({ theme }) => theme.colors["base-subtitle"]};
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
`;

export const FormInput = styled.input`
  width: 100%;
  min-height: 2.625rem;
  padding: 0.7rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors["base-button"]};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors["base-text"]};
  background: ${({ theme }) => theme.colors["base-input"]};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};

  &:focus {
    border-color: ${({ theme }) => theme.colors["brand-yellow-dark"]};
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  min-height: 5.5rem;
  padding: 0.7rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors["base-button"]};
  border-radius: 4px;
  resize: vertical;
  color: ${({ theme }) => theme.colors["base-text"]};
  background: ${({ theme }) => theme.colors["base-input"]};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};

  &:focus {
    border-color: ${({ theme }) => theme.colors["brand-yellow-dark"]};
  }
`;

export const TagPicker = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const TagOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.6rem;
  border-radius: 9999px;
  color: ${({ theme }) => theme.colors["brand-purple-dark"]};
  background: ${({ theme }) => theme.colors["brand-purple-light"]};
  font-size: ${({ theme }) => theme.textSizes["components-tag"]};
  font-weight: 700;
  cursor: pointer;
`;

export const FormActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.35rem;
`;

export const SuccessMessage = styled.p`
  color: ${({ theme }) => theme.colors["brand-purple-dark"]};
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.25rem;

  @media (max-width: 42rem) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled.div`
  padding: 1.25rem;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors["base-card"]};

  strong {
    display: block;
    color: ${({ theme }) => theme.colors["brand-purple-dark"]};
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: ${({ theme }) => theme.textSizes["title-title-l"]};
  }

  span {
    color: ${({ theme }) => theme.colors["base-label"]};
    font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  }
`;

export const TableWrap = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th, td {
    padding: 0.9rem 0.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors["base-button"]};
    vertical-align: middle;
    font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  }

  th {
    color: ${({ theme }) => theme.colors["base-label"]};
    font-weight: 400;
  }

  td strong {
    color: ${({ theme }) => theme.colors["base-subtitle"]};
  }
`;

export const Status = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors["brand-yellow-light"]};
  color: ${({ theme }) => theme.colors["brand-yellow-dark"]};
  font-size: ${({ theme }) => theme.textSizes["components-tag"]};
  font-weight: 700;
  text-transform: uppercase;
`;

export const AdminMessage = styled.p<{ error?: boolean }>`
  padding: 1.5rem;
  color: ${({ theme, error }) => error ? theme.colors["base-error"] : theme.colors["base-label"]};
  text-align: center;
`;

export const ActionButton = styled.button`
  padding: 0.5rem 0.7rem;
  border: none;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors["base-white"]};
  background: ${({ theme }) => theme.colors["brand-purple-dark"]};
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const AccessMessage = styled(AdminPanel)`
  margin: 4rem auto;
  max-width: 36rem;
  text-align: center;

  h1 {
    margin-bottom: 0.75rem;
    color: ${({ theme }) => theme.colors["base-title"]};
    font-family: ${({ theme }) => theme.fonts.title};
  }

  p {
    color: ${({ theme }) => theme.colors["base-label"]};
    line-height: 1.5;
  }
`;
