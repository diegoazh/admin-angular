import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly authService: OAuthService,
  ) {}

  ngOnInit(): void {
    const redirectUrl = localStorage.getItem('redirectUrl') || '/';
    this.authService
      .loadDiscoveryDocumentAndTryLogin()
      .then((result) => {
        console.info(`the login was ${result ? 'successful' : 'unsuccessful'}`);
        this.router.navigate([redirectUrl]);
      })
      .catch((error) => {
        this.router.navigate([redirectUrl]);
        console.error(`the login process failed: ${error}`);
      });
  }
}
