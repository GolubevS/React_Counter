import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

export {
    useAppDispatch,
    useAppSelector
};