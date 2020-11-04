import React, { createContext, FC, useCallback, useContext, useMemo } from 'react';
import { appendSegmentToPath } from '../../../shared/utils';

import type { ConductorProps } from './conductor.props';

type ConductorValue = (segment: string | number) => string;

const ConductorContext = createContext<ConductorValue | undefined>(undefined);

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

export function useConductor(segment: string | number): string {
  const createPath = useContext(ConductorContext);

  if (createPath === undefined) {
    throw new ReferenceError(`Use "Conductor" context for segment "${segment}" inside its provider.`);
  }

  return useMemo(() => createPath(segment), [createPath, segment]);
}
