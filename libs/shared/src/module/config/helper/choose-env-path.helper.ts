import { join } from 'path';
import { isNil } from 'ramda';

import { Application, Environment } from '../enum';

/**
 * Calculates env file path
 * TODO: rewrite hardcoded relative path logic to dynamic
 * @param type Type of application is used
 * @param env Environment runtime type
 * @returns path to file as string
 */
export function chooseEnvPath(type: Application, env: Environment): string {
  if (isNil(type) || isNil(env)) {
    throw new Error('No type or env was passed');
  }

  const application = Application[type].toLowerCase();
  const environment = Environment[env].toLowerCase();

  const splittedDirname = __dirname.split('/');
  const distEntryIdx = splittedDirname.findIndex(
    (entry: string) => entry === 'dist',
  );
  const repoPath = splittedDirname.slice(0, distEntryIdx).join('/');

  return join(repoPath, `/.env/.${environment}.${application}`);
}
