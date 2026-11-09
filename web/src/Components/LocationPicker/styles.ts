import styled, { css } from "styled-components";

export const LocationOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20;
  display: grid;
  place-items: center;
  padding: 1.25rem;
  background: rgba(39, 34, 33, 0.42);
`;

export const LocationDialog = styled.div`
  width: min(100%, 30rem);
  overflow: hidden;
  border-radius: 6px 30px 6px 30px;
  background: ${({ theme }) => theme.colors["base-white"]};
  box-shadow: 0 1.5rem 4rem rgba(39, 34, 33, 0.2);
`;

export const LocationHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: ${({ theme }) => theme.colors["brand-purple-light"]};
`;

export const LocationTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors["brand-purple-dark"]};
  font-family: ${({ theme }) => theme.fonts.title};
  font-size: ${({ theme }) => theme.textSizes["title-title-s"]};
`;

export const CloseButton = styled.button`
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors["brand-purple-dark"]};
  background: transparent;
`;

export const LocationForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
`;

export const PickerHint = styled.p`
  color: ${({ theme }) => theme.colors["base-text"]};
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  line-height: 1.5;
`;

export const LocationField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const PickerLabel = styled.label`
  color: ${({ theme }) => theme.colors["base-subtitle"]};
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  font-weight: 700;
`;

export const LocationInput = styled.input`
  width: 100%;
  height: 2.75rem;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors["base-button"]};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors["base-text"]};
  background: ${({ theme }) => theme.colors["base-input"]};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.textSizes["text-regular-m"]};

  &:focus {
    border-color: ${({ theme }) => theme.colors["brand-yellow-dark"]};
  }
`;

export const PickerButton = styled.button<{ variant?: "secondary" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-height: 2.75rem;
  padding: 0.7rem 1rem;
  border: none;
  border-radius: 6px;
  color: ${({ theme }) => theme.colors["base-white"]};
  background: ${({ theme }) => theme.colors["brand-purple-dark"]};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.textSizes["components-button-g"]};
  font-weight: 700;

  ${({ variant, theme }) => variant === "secondary" && css`
    color: ${theme.colors["base-text"]};
    background: ${theme.colors["base-button"]};
  `}

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export const PickerError = styled.p`
  color: ${({ theme }) => theme.colors["base-error"]};
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
`;

export const ConfirmAddress = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;

  > p {
    color: ${({ theme }) => theme.colors["base-text"]};
    font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  }
`;

export const LocationCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors["base-card"]};

  strong {
    color: ${({ theme }) => theme.colors["base-title"]};
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: ${({ theme }) => theme.textSizes["title-title-xs"]};
  }

  span, small {
    color: ${({ theme }) => theme.colors["base-label"]};
    font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  }
`;

export const ConfirmActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;

  @media (max-width: 28rem) {
    flex-direction: column-reverse;
  }
`;

export const LocationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  min-width: 2.3rem;
  max-width: 15rem;
  min-height: 2.3rem;
  padding: 0.45rem 0.7rem;
  border: none;
  border-radius: 6px;
  color: ${({ theme }) => theme.colors["brand-purple-dark"]};
  background: ${({ theme }) => theme.colors["brand-purple-light"]};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.textSizes["text-regular-s"]};
  cursor: pointer;
`;

export const LocationText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 36rem) {
    max-width: 7rem;
  }
`;
