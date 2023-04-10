import {
  Component,
  enableProdMode,
  Injector,
  isDevMode,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from '../environments/environment';
import { DarkModeService, LocatorService } from './shared/services';
import { SubscriptionsService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly authCodeFlowConfig: AuthConfig = {
    issuer: environment.auth.issuer,
    redirectUri: window.location.origin + '/authentication',
    clientId: environment.auth.clientId,
    dummyClientSecret: environment.auth.clientSecret,
    responseType: environment.auth.responseType,
    scope: environment.auth.scope,
    showDebugInformation: isDevMode(),
    requireHttps: environment.auth.requireHttps,
    oidc: environment.auth.oidc,
  };

  public isDarkModeEnabled = false;

  constructor(
    private readonly darkModeService: DarkModeService,
    private readonly primeConfig: PrimeNGConfig,
    private readonly titleService: Title,
    private readonly injector: Injector,
    private readonly oauthService: OAuthService,
    private readonly subsService: SubscriptionsService,
  ) {
    this.oauthService.configure(this.authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocument();

    this.titleService.setTitle(environment.siteTitle);
    this.primeConfig.ripple = true;
    this.primeConfig.setTranslation({});

    if (environment.production) {
      enableProdMode();
    }

    LocatorService.injector = this.injector;
  }

  ngOnInit(): void {
    const sub = this.darkModeService.darkMode$.subscribe({
      next: (value) => {
        this.isDarkModeEnabled = value;
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });

    this.subsService.add(AppComponent.name, sub);
  }

  ngOnDestroy(): void {
    this.subsService.unsubscribe(AppComponent.name);
  }
}
