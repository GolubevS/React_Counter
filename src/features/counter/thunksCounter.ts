import { 
    createAsyncThunk 
} from "@reduxjs/toolkit";
import { 
    amountNegativeMessage, 
    counterSliceName 
} from "./typesCounter";

const timeout = 2000;

export const incrementAsync = createAsyncThunk(`${counterSliceName}/increment`, 
    () => new Promise((resolve) => setTimeout(resolve, timeout)));

export const incrementByAmountAsync = createAsyncThunk(`${counterSliceName}/incrementByAmount`, 
    (amount: number) => new Promise<number>((resolve, reject) => 
        setTimeout(() => amount > 0 ? resolve(amount) : reject(amountNegativeMessage`${amount}`), timeout))
);

export const decrementAsync = createAsyncThunk(`${counterSliceName}/decrement`, 
    () => new Promise((resolve) => setTimeout(resolve, timeout)));

export const decrementByAmountAsync = createAsyncThunk(`${counterSliceName}/decrementByAmount`, 
    (amount: number) => new Promise<number>((resolve, reject) => 
        setTimeout(() => amount > 0 ? resolve(amount) : reject(amountNegativeMessage`${amount}`), timeout))
);

export const resetAsync = createAsyncThunk(`${counterSliceName}/reset`, 
    () => new Promise((resolve) => setTimeout(resolve, timeout)));