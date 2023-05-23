export function isEmpty(val: string | null) {
  if (val === null || val === "") {
    return true;
  }
  return false;
}
