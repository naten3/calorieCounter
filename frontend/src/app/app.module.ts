import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router'
import { ModalModule } from 'ng2-bootstrap/modal';

import { AppComponent } from './app.component';
import { LoginComponent, HomeComponent, MealItemComponent, AddUpdateMealComponent, NotFoundComponent } from './components';
import { AuthGuard, LoginGuard } from './guards';
import { UserService, MealService } from './services';
import { UserHomeResolve } from './resolves';

const appRoutes: Routes = [
  { path: 'user/:userId/meals', component: HomeComponent, canActivate: [AuthGuard],
    resolve: { meals: UserHomeResolve }
  },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MealItemComponent,
    AddUpdateMealComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot()
  ],
  providers: [LoginGuard, AuthGuard, UserHomeResolve, UserService, MealService],
  bootstrap: [AppComponent]
})
export class AppModule { }
