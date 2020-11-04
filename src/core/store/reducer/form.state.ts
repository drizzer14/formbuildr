import type { Entry, State } from '../../../shared/entity';
import { StateTransformer } from '../entity';

export class FormState {
  public constructor(private readonly state: State = new Map<string, unknown>()) {}

  public static fromJSON<T extends Record<string, unknown>>(json?: T): FormState {
    return new FormState(StateTransformer.fromJSON(json));
  }

  public toJSON<T extends Record<string, unknown>>(): T {
    return StateTransformer.toJSON(this.state);
  }

  public has(path: string): boolean {
    return this.state.has(path);
  }

  public get<T = unknown>(path: string): T | undefined {
    return this.state.get(path) as T;
  }

  public set(entry: Entry): FormState {
    return new FormState(this.state.set(...entry));
  }

  public delete(path: string): FormState {
    this.state.delete(path);

    return new FormState(this.state);
  }
}
