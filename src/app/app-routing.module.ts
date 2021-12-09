import { NgModule, Injector } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { OktaCallbackComponent, OktaAuthGuard, OktaAuthService } from '@okta/okta-angular';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path:'', component : HomeComponent},
  { path:'calculator', component: CalculatorComponent, canActivate: [OktaAuthGuard], data : [onAuthRequired]},
  { path: 'callback', component: OktaCallbackComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export function onAuthRequired(oktaAuth: OktaAuthService, injector: Injector): void {
  const router = injector.get(routes);
  router.navigate(['/login']);
}

