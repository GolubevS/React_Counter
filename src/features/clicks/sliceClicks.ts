import { 
    createSlice, 
    isAnyOf 
} from '@reduxjs/toolkit';
import { 
    clicksSliceName, 
    ClicksState 
} from './typesClicks';
import {
    reset,
    incrementByAmount,
    decrementByAmount,
    increment as incrementCounter,
    decrement as decrementCounter
} from '@/features/counter/sliceCounter';
import { 
    incrementAsync, 
    incrementByAmountAsync,
    decrementAsync, 
    decrementByAmountAsync,
    resetAsync
} from '@/features/counter/thunksCounter';

const initialState: ClicksState = {
    increment: 0,
    decrement: 0
};

const counterSlice = createSlice({
    name: clicksSliceName,
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addMatcher(isAnyOf(
                incrementCounter,
                incrementByAmount,
                incrementAsync.fulfilled,
                incrementByAmountAsync.fulfilled
            ), state => (
                {...state, increment: state.increment + 1}
            ))
            .addMatcher(isAnyOf(
                decrementCounter,
                decrementByAmount,
                decrementAsync.fulfilled,
                decrementByAmountAsync.fulfilled
            ), state => (
                {...state, decrement: state.decrement + 1}
            ))
            .addMatcher(isAnyOf(
                reset, 
                resetAsync.fulfilled
            ), () => initialState)
    },
    selectors: {
        selectIncrementClicks: state => state.increment,
        selectDecrementClicks: state => state.decrement
    }
});

export const {
    selectIncrementClicks,
    selectDecrementClicks
} = counterSlice.selectors;

export default counterSlice.reducer;