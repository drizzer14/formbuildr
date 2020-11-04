export interface PathSegment {
  /**
   * Name of the key that stores component's value or children inside the parent object.
   */
  name?: string;
  /**
   * Index of the parent's array that stores component's value or children. Has precedence over the `name` parameter.
   */
  index?: number;
}
