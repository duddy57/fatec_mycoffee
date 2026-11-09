import styled from "styled-components";

export const OurCoffeeCOntainer = styled.section`
  width: 100%;
  margin-top: -6rem;

  .catalog-controls {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .catalog-controls input,
  .catalog-controls select {
    border: 1px solid ${({ theme }) => theme.colors["base-button"]};
    border-radius: 6px;
    color: ${({ theme }) => theme.colors["base-text"]};
    background: ${({ theme }) => theme.colors["base-input"]};
    padding: 0.75rem;
  }

  .catalog-controls input {
    flex: 1;
  }

  @media (max-width: 600px) {
    .catalog-controls {
      flex-direction: column;
    }
  }
`;

export const CoffeeList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 2.5rem;
  margin-top: 3.5rem;
  gap: 1.25rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const CatalogMessage = styled.p`
  width: 100%;
  margin-top: 3.5rem;
  color: ${({ theme }) => theme.colors["base-label"]};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.textSizes["text-regular-m"]};
  text-align: center;
`;
