import { configureStore } from '@reduxjs/toolkit';
import counter from '@/features/counter/sliceCounter';
import clicks from '@/features/clicks/sliceClicks';

const store = configureStore({
    reducer: {
        counter,
        clicks
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;