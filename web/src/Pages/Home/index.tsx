import { Intro } from "./components/intro/intro";
import { OurCoffee } from "./components/OurCoffes";
import { HomeContainer } from "./styles";
export function Homepage() {
  return (
    <>
      <HomeContainer>
        <Intro />
      </HomeContainer>
      <OurCoffee />
    </>
  );
}
