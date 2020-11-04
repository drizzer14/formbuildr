export const appendSegmentToPath = (
  path: string | undefined,
  segment: string | number,
  predicate: () => boolean
): string => {
  return `${path}${predicate() ? `${path && '.'}${segment}` : `[${segment}]`}`;
};
