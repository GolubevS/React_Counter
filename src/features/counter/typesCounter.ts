export const counterSliceName = 'counter';

export const CounterStatus = {
    IDLE: 'idle',
    PENDING: 'pending',
    ERROR: 'error'
} as const;

export type CounterState = {
    value: number,
    status: typeof CounterStatus[keyof typeof CounterStatus],
    error?: string | null
}

export const amountNegativeMessage = (_literals: TemplateStringsArray, ...placeholders: number[]) =>
    `Amount (${placeholders[0]}) must not be negative`;