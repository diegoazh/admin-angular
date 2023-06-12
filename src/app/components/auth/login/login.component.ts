import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { SubscriptionsService } from '../../../shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly authService: OAuthService,
    private readonly subsService: SubscriptionsService,
  ) {}

  public ngOnInit(): void {
    const sub = this.route.queryParams.subscribe({
      next: (params) => {
        const redirectUrl = params['redirectUrl'] || '/';
        localStorage.setItem('redirectUrl', redirectUrl);
      },
      error: (error: unknown) => {
        console.error(error);
      },
    });
    this.authService.logOut();
    this.authService
      .revokeTokenAndLogout()
      .then((result) => {
        console.info(`logout was: ${result}`);
        this.authService.initCodeFlow();
      })
      .catch((error) => {
        console.error(`error on logout: ${error}`);
      });

    this.subsService.add(LoginComponent.name, sub);
  }

  ngOnDestroy(): void {
    this.subsService.unsubscribe(LoginComponent.name);
  }
}
