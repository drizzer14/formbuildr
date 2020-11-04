import { ActionType, Action } from './entity';

export class SetAction extends Action(ActionType.Set) {
  public constructor(
    public readonly payload: {
      path: string;
      value: unknown;
    }
  ) {
    super();
  }
}

export class DeleteAction extends Action(ActionType.Delete) {
  public constructor(
    public readonly payload: {
      path: string;
    }
  ) {
    super();
  }
}

export type FormAction = SetAction | DeleteAction;
