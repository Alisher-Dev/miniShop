export function FormatPrice(price: string) {
  const parsedPrice = parseFloat(price);

  if (isNaN(parsedPrice)) {
    return "Invalid price";
  }

  return parsedPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " s'om";
}
