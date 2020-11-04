import set from 'lodash.set';
import { appendSegmentToPath } from '../../../shared/utils';

export class StateTransformer {
  public static toJSON<T extends Record<string, unknown>>(map = new Map<string, unknown>()): T {
    return [...map.entries()].reduce((target, [path, value]) => {
      // eslint-disable-next-line prefer-object-spread
      return set(Object.assign({}, target), path, value);
    }, {} as T);
  }

  public static fromJSON<T extends Record<string, unknown>, M extends Map<string, unknown>>(json = {} as T): M {
    const transform = (object: T, initialMap = new Map() as M, path = ''): M => {
      Object.entries(object).forEach(([key, value]) => {
        const nextPath = appendSegmentToPath(path, key, () => Number.isNaN(Number.parseInt(key, 10)));

        if (typeof value === 'object') {
          transform(value as T, initialMap, nextPath);

          return;
        }

        initialMap.set(nextPath, value);
      });

      return initialMap;
    };

    return transform(json);
  }
}
