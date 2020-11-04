import type { Dispatch } from 'react';

import { FormAction, DeleteAction, SetAction } from './form.actions';

export class FormDispatcher {
  public constructor(private readonly dispatch: Dispatch<FormAction>) {}

  public set(path: string, value?: unknown): void {
    this.dispatch(
      new SetAction({
        path,
        value,
      })
    );
  }

  public delete(path: string): void {
    this.dispatch(
      new DeleteAction({
        path,
      })
    );
  }
}
