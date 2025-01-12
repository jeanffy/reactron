export const APP_PREFERENCES_PORT_TOKEN = Symbol.for('AppPreferencesPort');

export interface AppPreferencesPort {
  windowX?: number;
  windowY?: number;
  windowWidth: number;
  windowHeight: number;
  windowMaximized: boolean;
}
