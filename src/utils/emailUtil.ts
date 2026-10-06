export function uniqueEmail(base: string): string {
  const [name, domain] = base.split('@');
  return `${name}${Date.now()}${Math.floor(Math.random() * 1000)}@${domain}`;
}