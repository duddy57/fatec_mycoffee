import styled from 'styled-components'


interface TitleTextPros{

    color?: "title" | "subtitle" | "text",
    size?: "xl" | "l" | "m" | "s" | "xs",
    weight?: string | number
 }

 interface RegularTextPros{

    color?: "subtitle" | "text" | "label",
    size?:  "l" | "m" | "s",
    weight?: string | number
 }

export const TitleText = styled.h1<TitleTextPros>`
color: ${({theme, color})=> theme.colors[`base-${color ?? "title"}`]};
font-size: ${({theme, size})=> theme.textSizes[`title-title-${size ?? "m"}`]};
font-family: ${({theme})=> theme.fonts.title};
line-height: 130%;
font-weight: ${({weight})=> weight ?? 800};
`;

export const RegularText = styled.p<RegularTextPros>`
color: ${({theme, color})=> theme.colors[`base-${color ?? "text"}`]};
font-size: ${({theme, size})=> theme.textSizes[`text-regular-${size ?? "m"}`]};
font-family: ${({theme})=> theme.fonts.regular };
line-height: 130%;
font-weight: ${({weight})=> weight ?? 800};
`;