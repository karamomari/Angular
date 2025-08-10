import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Language } from './lang.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class LangEffects {
  constructor(private actions$: Actions) {}

  saveLang$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(Language),
        tap((action) => {
          localStorage.setItem('lang', action.lang);
        })
      ),
    { dispatch: false }
  );
}