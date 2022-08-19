import { is } from 'ramda';

export function toInt(value: string | number): number {
  if (is(String, value)) {
    return parseInt(value, 10);
  }

  return value;
}
