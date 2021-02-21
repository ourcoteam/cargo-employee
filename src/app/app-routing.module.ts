import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  {
    path: 'notifications',
    loadChildren: './notifications/notifications.module#NotificationsPageModule'
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfilePageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterPageModule'
  },
  {
    path: 'new-order',
    loadChildren: './new-order/new-order.module#NewOrderPageModule'
  },
  {
    path: 'boarding',
    loadChildren: './boarding/boarding.module#BoardingPageModule'
  },
  {
    path: 'shipment-details',
    loadChildren:
      './shipment-details/shipment-details.module#ShipmentDetailsPageModule'
  },
  {
    path: 'new-address',
    loadChildren: './new-address/new-address.module#NewAddressPageModule'
  },
  {
    path: 'location',
    loadChildren: './location/location.module#LocationPageModule'
  },  { path: 'forget', loadChildren: './forget/forget.module#ForgetPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
