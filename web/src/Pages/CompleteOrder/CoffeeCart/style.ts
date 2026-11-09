import styled from "styled-components";

export const CoffeeCardContainer = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
> div{
    display: flex;
    gap: 1.25rem;
    img{
        width: 4rem;
        height: 4rem;
    }
 
    border-bottom: 1px solid ${({theme}) => theme.colors["base-button"]} ;
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
    
}

>p{
   
    font-weight: 700;
    align-self: flex-start;
    
}
` 


export const ActionsContainer = styled.div`
margin-top: 0.5rem;
height: 2rem;
display: flex;
gap: 0.5rem;
display: flex;
align-items: center;

>div{
    max-width: 4.5rem;
    height: 100%;

}


`
export const RemoveButton = styled.button`
width: 6rem;
height: 2rem;
display: flex;
align-items: center;
gap: 0.25rem;
border: transparent;
background-color: ${({theme}) => theme.colors["base-button"]};
border-radius: 6px;
justify-content: center;
text-transform: uppercase;
font-size: ${({theme}) => theme.textSizes["text-regular-s"]};
color: ${({theme}) => theme.colors["base-subtitle"]};
transition: 0.4s;

&:hover{
    border: 1px solid ${({theme}) => theme.colors["brand-purple-dark"]};
}

` 