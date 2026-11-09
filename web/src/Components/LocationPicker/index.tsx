import { FormEvent, useState } from "react";
import { Check, MapPin, X } from "phosphor-react";
import { useDeliveryLocation, DeliveryLocation } from "../../context/DeliveryLocationContext";
import { CloseButton, ConfirmAddress, ConfirmActions, LocationButton, LocationCard, LocationDialog, LocationField, LocationForm, LocationHeader, LocationInput, LocationOverlay, LocationText, LocationTitle, PickerButton, PickerError, PickerHint, PickerLabel } from "./styles";

function formatCep(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
}

export function LocationPicker() {
  const { isPickerOpen, closePicker, saveLocation } = useDeliveryLocation();
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState<DeliveryLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isPickerOpen) return null;

  async function findAddress(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanCep = cep.replace(/\D/g, "");
    setError("");
    setAddress(null);
    if (cleanCep.length !== 8) {
      setError("Digite um CEP com 8 números.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      if (!response.ok) throw new Error("Não foi possível consultar o CEP.");
      const data = await response.json() as DeliveryLocation & { erro?: boolean };
      if (data.erro) throw new Error("CEP não encontrado. Confira os números e tente novamente.");
      setAddress({ cep: cleanCep, logradouro: data.logradouro, bairro: data.bairro, localidade: data.localidade, uf: data.uf });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível consultar o CEP.");
    } finally {
      setLoading(false);
    }
  }

  return <LocationOverlay role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closePicker()}><LocationDialog role="dialog" aria-modal="true" aria-labelledby="location-title"><LocationHeader><LocationTitle id="location-title"><MapPin size={22} weight="fill" />Onde você quer receber?</LocationTitle><CloseButton type="button" onClick={closePicker} aria-label="Fechar"><X size={20} /></CloseButton></LocationHeader>{address ? <ConfirmAddress><p>Encontramos este endereço:</p><LocationCard><strong>{address.localidade}, {address.uf}</strong><span>{address.logradouro || "Endereço não informado"}</span><span>{address.bairro || "Bairro não informado"}</span><small>CEP {formatCep(address.cep)}</small></LocationCard><ConfirmActions><PickerButton type="button" variant="secondary" onClick={() => setAddress(null)}>Alterar CEP</PickerButton><PickerButton type="button" onClick={() => saveLocation(address)}><Check size={18} weight="bold" />Confirmar endereço</PickerButton></ConfirmActions></ConfirmAddress> : <LocationForm onSubmit={findAddress}><PickerHint>Informe seu CEP para estimar a entrega e ver opções perto de você.</PickerHint><LocationField><PickerLabel htmlFor="delivery-cep">CEP</PickerLabel><LocationInput id="delivery-cep" inputMode="numeric" autoComplete="postal-code" value={formatCep(cep)} onChange={(event) => setCep(formatCep(event.target.value))} placeholder="00000-000" /></LocationField>{error && <PickerError role="alert">{error}</PickerError>}<PickerButton type="submit" disabled={loading}>{loading ? "Consultando..." : "Continuar"}</PickerButton></LocationForm>}</LocationDialog></LocationOverlay>;
}

export { LocationButton, LocationText };
