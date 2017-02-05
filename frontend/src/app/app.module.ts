import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router'
import { ModalModule } from 'ng2-bootstrap/modal';

import { AppComponent } from './app.component';
import { LoginComponent, HomeComponent, MealItemComponent, AddUpdateMealComponent } from './components';
import { AuthGuard } from './guards';
import { UserService, MealService } from './services';
import { UserHomeResolve } from './resolves';

const appRoutes: Routes = [
  { path: '', redirectTo: 'user/:userId/meals', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'user/:userId/meals', component: HomeComponent, canActivate: [AuthGuard],
    resolve: { meals: UserHomeResolve }
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MealItemComponent,
    AddUpdateMealComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot()
  ],
  providers: [AuthGuard, UserHomeResolve, UserService, MealService],
  bootstrap: [AppComponent]
})
export class AppModule { }
