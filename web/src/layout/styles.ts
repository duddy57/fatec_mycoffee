import styled from "styled-components";

export const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  main {
    flex: 1;
  }

  .container {
    width: 100%;
    max-width: 70rem;
    margin-right: auto;
    margin-left: auto;
  }
`;
