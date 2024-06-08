import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

export const useTypeDispatch: () => AppDispatch = useDispatch;

export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;