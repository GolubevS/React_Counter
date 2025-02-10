import { 
    createSlice, 
    isFulfilled, 
    isPending, 
    isRejected, 
    PayloadAction 
} from '@reduxjs/toolkit';
import { 
    decrementAsync, 
    decrementByAmountAsync, 
    incrementAsync, 
    incrementByAmountAsync, 
    resetAsync 
} from './thunksCounter';
import { 
    amountNegativeMessage,
    CounterStatus, 
    counterSliceName, 
    CounterState 
} from './typesCounter';

const initialState: CounterState = {
    value: 0,
    status: CounterStatus.IDLE
};

const counterSlice = createSlice({
    name: counterSliceName,
    initialState: initialState,
    reducers: {
        increment: state => { 
            state.value++;
            state.status = CounterStatus.IDLE;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            const amount = action.payload;

            if(action.payload > 0) {
                state.value += amount;
                state.status = CounterStatus.IDLE;
            } else {
                state.status = CounterStatus.ERROR;
                state.error = amountNegativeMessage`${amount}`
            }
        },
        decrement: state => { 
            state.value--;
            state.status = CounterStatus.IDLE;
        },
        decrementByAmount: (state, action: PayloadAction<number>) => {
            const amount = action.payload;

            if(action.payload > 0) {
                state.value -= amount;
                state.status = CounterStatus.IDLE;
            } else {
                state.status = CounterStatus.ERROR;
                state.error = amountNegativeMessage`${amount}`
            }
        },
        reset: () => initialState
    },
    extraReducers: builder => {
        builder
            .addCase(incrementAsync.fulfilled, state => { 
                state.value++ 
            })
            .addCase(incrementByAmountAsync.fulfilled, (state, action) => { 
                state.value += action.payload 
            })
            .addCase(decrementAsync.fulfilled, state => { 
                state.value-- 
            })
            .addCase(decrementByAmountAsync.fulfilled, (state, action) => { 
                state.value -= action.payload 
            })
            .addCase(resetAsync.fulfilled, () => 
                initialState
            )
            .addMatcher(isPending, (state) => 
                ({...state, status: CounterStatus.PENDING, error: null})
            )
            .addMatcher(isFulfilled, (state) => 
                ({...state, status: CounterStatus.IDLE, error: null})
            )
            .addMatcher(isRejected, (state, action) => 
                ({...state, status: CounterStatus.ERROR, error: action.error.message})
            )
    },
    selectors: {
        selectValue: state => state.value,
        selectStatus: state => state.status,
        selectError: state => state.error
    }
});

export const {
    increment, 
    decrement,
    incrementByAmount,
    decrementByAmount,
    reset
} = counterSlice.actions;

export const {
    selectValue,
    selectStatus,
    selectError
} = counterSlice.selectors;

export default counterSlice.reducer;