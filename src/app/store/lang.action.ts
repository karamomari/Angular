import { createAction, props } from "@ngrx/store";

export const Language=createAction("language",props<{lang:string}>())