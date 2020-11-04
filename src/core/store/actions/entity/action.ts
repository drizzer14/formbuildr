import type { ActionType } from './action-type';

export function Action<T extends ActionType>(
  type: T
): {
  new (...args: any[]): {
    readonly type: T;
  };
} {
  return class BareAction {
    public readonly type = type;
  };
}
