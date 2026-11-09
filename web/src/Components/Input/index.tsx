import { forwardRef, InputHTMLAttributes } from "react";
import { RegularText } from "../Header/Typography";
import { InputStyleContainer, InputWrapper } from "./styles";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
   error?: string //criando a tipagem do erro
}
//passando todas as tipagens de um in´put, como value
//placeholder, onchange, entre outros




export const InputText = forwardRef<HTMLInputElement, InputProps>(
   ({ error , className, ...props}, ref) => { //desestururando as props do imput para passar o erro
      return   <InputWrapper className={className}>
      <InputStyleContainer  {...props} ref={ref}/>
      {error && (
         <RegularText size="s">{error}</RegularText> //criando o erro e um if que se tiver ele digita um regular
         //com o erro dentro
      )}
      </InputWrapper>
   }
)