export const DOMAIN_CONFIG_PORT_TOKEN = Symbol.for('DomainConfigPort');

export interface DomainConfigPort {
  readonly dummiesFolder: string;
}
