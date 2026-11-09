import styled from 'styled-components'


interface IconContainerpRops{
    iconBg: string
}

export const InfoWithContainer = styled.div`
display: flex;
align-items: center;
gap:0.75rem
`

export const IconContainer = styled.div<IconContainerpRops>`
width: 2rem ;
height:2rem ;
border-radius: 9999px;
background-color: ${({iconBg}) => iconBg} ;
color:  ${({theme}) => theme.colors['base-white']};
display: flex ;
align-items: center ;
justify-content: center ;
`
