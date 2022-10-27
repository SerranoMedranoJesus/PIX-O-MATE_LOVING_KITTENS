import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "./components/home/home.component";
import { OwnersComponent } from './components/owners/owners.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'owners', component: OwnersComponent },
  { path: 'search', component: OwnersComponent },
  { path: '', pathMatch: 'full', redirectTo: '' },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
