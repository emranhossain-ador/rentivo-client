export const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-BD").format(price);