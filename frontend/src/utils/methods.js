// Keep these values in sync with the BrewMethod enum in
// backend/prisma/schema.prisma
export const BREW_METHODS = [
  { value: "AEROPRESS", label: "Aeropress" },
  { value: "DRIP_COFFEE", label: "Drip coffee" },
  { value: "V60", label: "V60" },
  { value: "FRENCH_PRESS", label: "French press" },
  { value: "ESPRESSO", label: "Espresso" },
  { value: "MOKA_POT", label: "Moka pot" },
  { value: "COLD_BREW", label: "Cold brew" },
  { value: "CHEMEX", label: "Chemex" },
];

export function methodLabel(value) {
  return BREW_METHODS.find((m) => m.value === value)?.label ?? value;
}