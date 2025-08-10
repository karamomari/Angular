import { createReducer, on } from "@ngrx/store";
import { Language } from "./lang.action";

const initlang="en"
export const landreduceser=createReducer(
    initlang,
    on(Language,(stats,action)=>action.lang)
)