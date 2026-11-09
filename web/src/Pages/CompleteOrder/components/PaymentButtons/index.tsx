import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { ContentContainer, PaymentButtonStyle } from "./style";

type PaymentMethodsProps = InputHTMLAttributes<HTMLInputElement> & {
  icon: ReactNode;
  label: string;
};

export const PaymentMethodInput = forwardRef<
  HTMLInputElement,
  PaymentMethodsProps
>(({ icon, label, id, ...props }, ref) => {
  return (
    <PaymentButtonStyle>
      <label>
        <input id={id} type="radio" name="PaymentMethod" {...props} ref={ref} />
        <ContentContainer>
          {icon}
          {label}
        </ContentContainer>
      </label>
    </PaymentButtonStyle>
  );
});
