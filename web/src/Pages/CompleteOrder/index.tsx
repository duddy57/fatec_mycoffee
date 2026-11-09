import { CompleteOrderForm } from "./components/CompleteOrderForm";
import { SelectedCoffees } from "./SelectedCoffees";
import { COmpleteOrderContainer } from "./styles";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api, type PedidoRespostaDto, type Uf } from "../../services/api";
import { UseCart } from "../../utils/hooks/useContext";
import { useAuth } from "../../context/AuthContext";
import { useDeliveryLocation } from "../../context/DeliveryLocationContext";


const confirmOrderFormValidationSchema = zod.object({
  cep: zod.string().min(8, "Digite o CEP").max(8, "Digite o CEP"),  //objeto do zod onde fica o sccehema de valdiação do formulario
  street: zod.string().min(1, "Digite o Nome da rua"),
  number: zod.string().min(1, "Digite o número"),
  complement: zod.string(),
  bairro: zod.string().min(1, "Digite o bairro"),
  city: zod.string().min(1, "Digite a cidade"),
  uf: zod.string().min(1, "Digite a uf"),
  paymentMethod: zod.coerce.number().positive("Informe o método de pagamento")
});

export type orderData = zod.infer<typeof confirmOrderFormValidationSchema>;  //zod infer infere o tipo de schema
//em orderData

type confirmOrderData = orderData; //ConfirmOrderData [e igual ao tipo inferido da schema para usar no form todo]
export function CartPage() {
  const { location } = useDeliveryLocation();
  const confirmOrderForm = useForm<confirmOrderData>({ //generic tipando  o confirmOrderFor
    resolver: zodResolver(confirmOrderFormValidationSchema),
    defaultValues: {
      cep: location?.cep ?? "",
      street: location?.logradouro ?? "",
      bairro: location?.bairro ?? "",
      city: location?.localidade ?? "",
      uf: location?.uf ?? "",
      number: "",
      complement: "",
    },
  });

  const navigate = useNavigate();
  const { cartItems, ClearCart } = UseCart();
  const { token } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { handleSubmit } = confirmOrderForm; //confirmOderForm que é um useForm com a tipagem com o schema
  //passando o resolver da biblioteca zod pegando esse scehema
  async function handleConfirmOrder(data: confirmOrderData) {
    if (!cartItems.length) {
      setSubmitError("Adicione pelo menos um café ao carrinho.");
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      const order: PedidoRespostaDto = await api.criarPedido({
        formaPagamentoId: data.paymentMethod,
        itens: cartItems.map((item) => ({ cafeId: item.id, quantidade: item.quantity })),
        endereco: {
          cep: data.cep,
          logradouro: data.street,
          numero: data.number,
          complemento: data.complement || undefined,
          bairro: data.bairro,
          cidade: data.city,
          uf: data.uf.toUpperCase() as Uf,
        },
      }, token ?? undefined);
      ClearCart();
      navigate('/Delivery', { state: order });
    } catch {
      setSubmitError("Não foi possível confirmar o pedido. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <FormProvider {...confirmOrderForm}>
      <COmpleteOrderContainer
        className="container"
        onSubmit={handleSubmit(handleConfirmOrder)}
      >
         <CompleteOrderForm />
         <SelectedCoffees submitting={submitting} submitError={submitError} />
      </COmpleteOrderContainer>
    </FormProvider>
  );
}
