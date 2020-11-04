import React, { createContext, FC, useCallback, useContext, useMemo } from 'react';

import { appendSegmentToPath } from '../../../shared/utils';

import type { ConductorProps } from './conductor.props';

type ConductorValue = (segment: string | number) => string;

const ConductorContext = createContext<ConductorValue | undefined>(undefined);

/**
 * React context used for the creation of paths from nested JSX.
 *
 * @param {string | undefined} path
 * A path segment to be prepended to its children's paths.
 */
const Conductor: FC<ConductorProps> = ({ children, path = '' }) => {
  const createPath = useCallback<ConductorValue>(
    (segment) => {
      return appendSegmentToPath(path, segment, () => typeof segment === 'string');
    },
    [path]
  );

  return <ConductorContext.Provider value={createPath}>{children}</ConductorContext.Provider>;
};

export default Conductor;

/**
 * React hook that appends its parameter to the parent's Conductor context path.
 *
 * @param {string | number} segment
 * A path segment that could either be a name of the object's key or an array's index.
 * @returns {string}
 */
export function useConductor(segment: string | number): string {
  const createPath = useContext(ConductorContext);

  if (createPath === undefined) {
    throw new ReferenceError(`Use "Conductor" context for segment "${segment}" inside its provider.`);
  }

  return useMemo(() => createPath(segment), [createPath, segment]);
}
