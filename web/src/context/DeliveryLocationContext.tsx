import { createContext, ReactNode, useContext, useState } from "react";

export interface DeliveryLocation {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

interface DeliveryLocationContextValue {
  location: DeliveryLocation | null;
  isPickerOpen: boolean;
  openPicker: () => void;
  closePicker: () => void;
  saveLocation: (location: DeliveryLocation) => void;
}

const LOCATION_KEY = "mycoffee.delivery.location";
const DISMISSED_KEY = "mycoffee.delivery.location.dismissed";
const DeliveryLocationContext = createContext<DeliveryLocationContextValue | undefined>(undefined);

function readLocation() {
  try {
    const stored = localStorage.getItem(LOCATION_KEY);
    return stored ? JSON.parse(stored) as DeliveryLocation : null;
  } catch {
    localStorage.removeItem(LOCATION_KEY);
    return null;
  }
}

export function DeliveryLocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<DeliveryLocation | null>(readLocation);
  const [isPickerOpen, setPickerOpen] = useState(() => !readLocation() && !localStorage.getItem(DISMISSED_KEY));

  function openPicker() {
    setPickerOpen(true);
  }

  function closePicker() {
    localStorage.setItem(DISMISSED_KEY, "true");
    setPickerOpen(false);
  }

  function saveLocation(nextLocation: DeliveryLocation) {
    localStorage.setItem(LOCATION_KEY, JSON.stringify(nextLocation));
    localStorage.removeItem(DISMISSED_KEY);
    setLocation(nextLocation);
    setPickerOpen(false);
  }

  return <DeliveryLocationContext.Provider value={{ location, isPickerOpen, openPicker, closePicker, saveLocation }}>{children}</DeliveryLocationContext.Provider>;
}

export function useDeliveryLocation() {
  const context = useContext(DeliveryLocationContext);
  if (!context) throw new Error("useDeliveryLocation precisa estar dentro de DeliveryLocationProvider");
  return context;
}
