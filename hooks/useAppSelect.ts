import { RootState } from "@/store/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const useAppSelect: TypedUseSelectorHook<RootState> = useSelector

export default useAppSelect;