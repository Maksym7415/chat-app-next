import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../reduxToolkit/store";

export const useAppStoreDispatch = () => useDispatch<AppDispatch>();
export const useAppStoreSelector: TypedUseSelectorHook<RootState> = useSelector;
