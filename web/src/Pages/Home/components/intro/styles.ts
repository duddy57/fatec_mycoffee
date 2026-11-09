import styled from "styled-components";
import introUrlPngImg from "../../../../assets/Background.png";
import { TitleText , RegularText} from "../../../../Components/Header/Typography";
export const IntroContainer = styled.section`
  width: 100%;
  height: 34rem;
  background: ${() => `url(${introUrlPngImg}) no-repeat center`};
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items:center
`;

export const IntroContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3.5rem;
`;

export const IntroTitle = styled(TitleText)`
  margin-bottom: 1rem;
 
`;

export const IntroText = styled(RegularText)`
font-family: 'Roboto Mono', monospace;

margin-top: 1rem;

`

export const BenefitsContainer = styled.div`
width: 100%;
display: grid;
grid-template-columns: 1fr 1fr;
row-gap: 1.25rem;
margin-top: 4.12rem;
`