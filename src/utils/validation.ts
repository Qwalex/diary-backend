export const isEmptyString = (value: unknown): boolean => {
  if (value === undefined || value === null) {
    return true;
  }

  return String(value).trim().length === 0;
};
