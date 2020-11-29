import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {RecordsComponent} from './records/records.component';
import {PreferencesComponent} from './preferences/preferences.component';
import {GameComponent} from './game/game.component';
import {LoginComponent} from './login/login.component';
import {RegistroComponent} from './registro/registro.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'records', component: RecordsComponent},
  { path: 'preferences', component: PreferencesComponent},
  { path: 'game', component: GameComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent},
  { path:  '', redirectTo: 'home', pathMatch: 'full' },
  { path:  '**', redirectTo: 'home', pathMatch: 'full' },
];
@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
