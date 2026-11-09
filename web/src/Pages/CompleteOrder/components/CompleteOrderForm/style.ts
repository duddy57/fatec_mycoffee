import styled from "styled-components";


export const CompleteOrderFormContainer = styled.div`
display: flex ;
flex-direction: column ;
gap:0.75rem;
width: 40rem ;
`

export const SectionBaseStyle = styled.div`
width: 100% ;
background: ${({theme}) => theme.colors["base-card"]} ;
border: 6px ;
padding: 2.5rem ;
` 

export const AdressFormContainer = styled.div`
width: 100% ;
display: grid ;
grid-template-columns: 12.5rem 17.25rem 3.75rem ;
row-gap: 1rem ;
grid-auto-flow: dense;

.cep{
    grid-column: span 3 ; //faz o cep ocupar 3 colunas
    max-width: 12.5rem ;
    display: flex;
    justify-content: space-between;
}

.street{
    grid-column: span 3 ;
}

.complement{
    grid-column: span 2 ;
}
`

export const PaymentFormContainer = styled(SectionBaseStyle)`
    

`

export const PaymentButtonContainer = styled.div`
margin-top: 3rem;
display: flex;
gap: 2rem;

>p{

  color: ${({theme}) => theme.colors["base-error"]};

}

`