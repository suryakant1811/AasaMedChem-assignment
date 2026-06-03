export const UNITS = ['G', 'KG', 'ML', 'L', 'UNIT'] as const;
export const DIMENSIONS = ['WEIGHT', 'VOLUME', 'COUNT'] as const;

export type Unit = (typeof UNITS)[number];
export type Dimension = (typeof DIMENSIONS)[number];
