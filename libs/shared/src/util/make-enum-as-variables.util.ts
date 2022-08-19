import { is, pipe, reduce } from 'ramda';
import { parseEnvVariable } from './parse-env-variable.util';

/**
 * Used to create variables parser
 * @param prefix prefix to use with env variabled
 * @returns parser which accepts enumumerated values
 */
export function makeEnumAsVariablesParser(prefix: string) {
  const reducer = (acc: Record<string, string>, key: string) => {
    const envKey = makeEnvKey(key, prefix);
    const variable = parseEnvVariable(envKey);

    return {
      ...acc,
      [key.toLowerCase()]: variable,
    };
  };

  return pipe(enumAsStringArray, reduce(reducer, {}));
}

/**
 * Adds prefix to key
 * @param key key parsed from enum
 * @param prefix prefix is used in .env file
 * @returns environment variable key as string
 */
function makeEnvKey(key: string, prefix?: string): string {
  if (!prefix) {
    return key;
  }
  return `${prefix}_${key}`;
}

/**
 * Converts enumerated value to string
 * @param enumed enumerate value
 * @returns array of strings which represents enum fields
 */
function enumAsStringArray<T>(enumed: T): Array<string> {
  return Object.values(enumed).filter(is(String));
}
