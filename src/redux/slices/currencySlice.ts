import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CurrencyType = 'USD' | 'RUB';

interface CurrencyState {
    currentCurrency: CurrencyType;
}

const initialState: CurrencyState = {
    currentCurrency: 'USD',
};

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setCurrency: (state, action: PayloadAction<CurrencyType>) => {
            state.currentCurrency = action.payload;
        },
    },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
