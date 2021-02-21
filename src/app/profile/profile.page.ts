import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from '../services/ui/loading.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  userLang;
  constructor(
    public authService: AuthService,
    public apiService: ApiService,
    private router: Router,

    public _translate: TranslateService,
    private loadingUI: LoadingService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((route: NavigationStart) => {
        // console.log('Route: ', route.url);
        if (route.url === '/tabs/profile') {
          if (this.authService.isAuthenticated()) {
            this.authService.getWallet(this.authService.userToken);
          }
        }
      });
  }

  async ngOnInit() {
    await this.authService.returnUserLang().then(lang => {
      // console.log(lang);
      this.userLang = lang;
      // console.log(this.userLang);
    });
    // console.log(this.authService.userData);
  }

  async changeLang() {
    console.log(this.userLang);
    this.authService.changeUserLang(this.userLang).then(() => {
      console.log(this.authService.userData.language);
    });
  }
}
