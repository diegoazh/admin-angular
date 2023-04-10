import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private darkModeValue = false;

  private systemPreference: MediaQueryList;

  private darkModeEmitter = new EventEmitter<boolean>();

  public darkMode$ = this.darkModeEmitter.asObservable();

  constructor() {
    localStorage.removeItem('theme');
    this.systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
  }

  public emit(value?: boolean): void {
    if (value == null) {
      localStorage.removeItem('theme');
      return this.checkSystemPreference();
    } else {
      this.unListenSystemPreference();
      this.darkModeValue = value;
      localStorage.setItem('theme', this.darkModeValue ? 'dark' : 'light');
    }

    this.darkModeEmitter.emit(this.darkModeValue);
  }

  public checkSystemPreference(): void {
    if (!('theme' in localStorage)) {
      this.darkModeValue = this.systemPreference.matches;
      this.darkModeEmitter.emit(this.darkModeValue);
      this.listenSystemPreference();
    } else if (localStorage.getItem('theme') === 'dark') {
      this.darkModeValue = true;
    } else {
      this.darkModeValue = false;
    }
  }

  private listenSystemPreference(): void {
    this.systemPreference.onchange = (event) => {
      if (event.isTrusted) {
        this.darkModeValue = event.matches;
        const el = document.getElementById('main_router_outlet_wrapper');

        this.darkModeValue
          ? el?.classList.add('dark')
          : el?.classList.remove('dark');
      }
    };
  }

  private unListenSystemPreference(): void {
    this.systemPreference.onchange = null;
  }
}
