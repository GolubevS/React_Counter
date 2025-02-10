import { ChangeEventHandler, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
    decrement, 
    decrementByAmount, 
    increment, 
    incrementByAmount, 
    reset, 
    selectError, 
    selectStatus, 
    selectValue 
} from '@/features/counter/sliceCounter';
import { 
    decrementAsync, 
    decrementByAmountAsync, 
    incrementAsync, 
    incrementByAmountAsync, 
    resetAsync
} from '../features/counter/thunksCounter';
import { CounterStatus } from '@/features/counter/typesCounter';

const Counter = () => {
    const [amount, setAmount] = useState(0);
    const [isAsync, setIsAsync] = useState(false);
    const value = useAppSelector(selectValue);
    const status = useAppSelector(selectStatus);
    const error = useAppSelector(selectError);
    const dispatch = useAppDispatch();
    
    const isPending = status === CounterStatus.PENDING;
    const isError = status === CounterStatus.ERROR;

    const onAsyncChanged: ChangeEventHandler<HTMLInputElement> = (e) => 
        setIsAsync(e.target.checked);

    const onAmountChanged: ChangeEventHandler<HTMLInputElement> = (e) => 
        setAmount(+e.target.value);

    const onIncrementClick = () =>
        isAsync
        ? dispatch(amount ? incrementByAmountAsync(amount) : incrementAsync())
        : dispatch(amount ? incrementByAmount(amount) : increment());

    const onDecrementClick = () =>
        isAsync
        ? dispatch(amount ? decrementByAmountAsync(amount) : decrementAsync())
        : dispatch(amount ? decrementByAmount(amount) : decrement());

    const onResetClick = () => {
        setAmount(0);

        isAsync
        ? dispatch(resetAsync())
        : dispatch(reset());
    }

    return (
        <div>
            <p>
                Counter value: {value}
            </p>
            <button 
                name='decrement'
                disabled={isPending}
                onClick={onDecrementClick}
            >
                -
            </button>
            <label>
                Amount:&nbsp;
                <input 
                    name='amount'
                    type='number'
                    value={amount}
                    onChange={onAmountChanged}
                />
            </label>
            <button 
                name='increment'
                disabled={isPending}
                onClick={onIncrementClick}
            >
                +
            </button>
            <button
                name='reset'
                disabled={isPending}
                onClick={onResetClick}
            >
                Reset
            </button>
            <div>
                <label>
                    async mode
                    <input 
                        name='isAsync'
                        type='checkbox'
                        checked={isAsync}
                        onChange={onAsyncChanged}
                    />
                </label>
            </div>
            { 
                isError &&
                <p className='error'>
                    {error}
                </p>
            }
        </div>
    );
}

export default Counter;