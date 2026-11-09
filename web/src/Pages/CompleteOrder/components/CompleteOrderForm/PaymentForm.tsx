import { Money, CreditCard, Bank, CurrencyCircleDollar } from "phosphor-react";
import { useTheme } from "styled-components";
import { PaymentMethodInput } from "../../components/PaymentButtons/index";
import { PaymentButtonContainer, PaymentFormContainer } from "./style";
import { useFormContext } from "react-hook-form";
import { RegularText } from "../../../../Components/Header/Typography";
import { useEffect, useState } from "react";
import { api, type FormaPagamento } from "../../../../services/api";


export function PaymentForm() {
  const {register, formState: {errors}} = useFormContext();
  const paymentMethodError = errors?.paymentMethod?.message as unknown as string;
  const [methods, setMethods] = useState<FormaPagamento[]>([]);
  useEffect(() => {
    api.listarFormasPagamento().then((items) => setMethods(items.filter((item) => item.ativo))).catch(() => setMethods([]));
  }, []);

  function iconForMethod(code: string) {
    if (code.toLowerCase().includes("crédito") || code.toLowerCase().includes("credito")) return <CreditCard />;
    if (code.toLowerCase().includes("débito") || code.toLowerCase().includes("debito")) return <Bank />;
    return <CurrencyCircleDollar />;
  }

  return (

    <PaymentButtonContainer >
      {methods.map((method) => (
        <PaymentMethodInput
          key={method.id}
          label={method.descricao}
          icon={iconForMethod(`${method.codigo} ${method.descricao}`)}
          id={String(method.id)}
          value={method.id}
          {...register("paymentMethod")}
          
        />
      ))}
     <p>
     {paymentMethodError && <RegularText>{paymentMethodError}</RegularText>}
     </p>
    </PaymentButtonContainer>

  );
}
