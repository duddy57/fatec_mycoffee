import styled from "styled-components";

export const DeliveryContainer = styled.div`
  display: flex;
  margin-top: 5rem;
  flex-direction: column;
  gap: 2.5rem;

  h1 {
    color: ${({ theme }) => theme.colors["brand-yellow-dark"]};
  }

  > section {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;

export const OrderDetailsContainer = styled.div`
  min-width: 32.875rem;
  height: 16.875rem;
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  gap: 2rem;
  margin-right: 6.375rem ;
  border-radius: 6px 44px 6px 44px;
  background: ${({ theme }) => theme.colors["base-background"]};
  position: relative;
  

&::before{
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: 7px 45px 7px 45px;
    z-index: -1;
    background: linear-gradient(102.89deg, #DBAC2C 2.61%, #8047F8 98.76%);;
    


}
`;
