import { InjectionToken, Injectable } from '@angular/core';

export interface ApiSettings {
  API_ENDPOINT: string;
}
export const APP_CONFIG = new InjectionToken<ApiSettings>('AppConfig');
