export function parseEnvVariable(name: string): string {
  return process.env[name];
}
