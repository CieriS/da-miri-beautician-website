const priceFormatter = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

/** Formatta un prezzo in euro secondo la convenzione italiana (es. "30 €"). */
export function formatPrice(value: number): string {
  return priceFormatter.format(value);
}

/**
 * Sostituisce i segnaposto `{chiave}` di un testo.
 * Un segnaposto senza valore interrompe la build, così un refuso nei JSON non arriva online.
 */
export function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (placeholder, key: string) => {
    if (!(key in values)) {
      throw new Error(
        `[data] Segnaposto ${placeholder} non supportato in "${template}". Disponibili: ${Object.keys(values).join(", ")}.`,
      );
    }
    return String(values[key]);
  });
}
