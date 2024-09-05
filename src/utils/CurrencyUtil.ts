const exchangeRates: { [key in 'USD' | 'RUB' | 'UZS']: number } = {
    USD: 1,
    RUB: 100,
    UZS: 12654,
};

export const convertPrice = (price: number, currency: 'USD' | 'RUB' | 'UZS') => {
    return (price * (exchangeRates[currency] || 1)).toFixed(2);
};
