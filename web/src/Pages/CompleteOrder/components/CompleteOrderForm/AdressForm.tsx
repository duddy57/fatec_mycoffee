import { useFormContext } from "react-hook-form";
import { InputText } from "../../../../Components/Input";
import { AdressFormContainer } from "./style";


interface ErrorType {
    errors: {
        [key: string] :{
            message: string //tipagem do erro com estrutura de objeto, com keu e message
        }
    }
}
export function AdressForm() {
    
    const {register,formState} = useFormContext();
    const {errors } = formState as unknown as ErrorType; //passando o FormState com a tipagem do erro que o zod endnede
  return (
    <>
      <AdressFormContainer>
        <InputText placeholder="CEP" className="cep" type="number"   error={errors.cep?.message} {...register("cep")} />
        <InputText placeholder="Rua" className="street"  {...register("street") } error={errors.street?.message}/>
        <InputText placeholder="Numero" type="number" {...register("number") } error={errors.number?.message} />
        <InputText
          placeholder="Complemento         
                                                opcional"
          className="complement"
          {...register("complement") }
        />
        <InputText placeholder="Bairro" {...register("bairro") } error={errors.bairro?.message} />
        <InputText placeholder="Cidade" {...register("city") } error={errors.city?.message} />
        <InputText placeholder="UF"  {...register("uf") } error={errors.uf?.message}/>
      </AdressFormContainer>
    </>
  );
}
