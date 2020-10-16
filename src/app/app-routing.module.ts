import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarEditComponent } from './car-edit/car-edit.component';
import { CarListOwnerComponent } from './car-list-owner/car-list-owner.component';
import { OwnerEditComponent } from './owner-edit/owner-edit.component';
import { OwnerListComponent } from './owner-list/owner-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/car-list', pathMatch: 'full' },
  {
    path: 'car-list',
    component: CarListOwnerComponent
  },
  {
    path: 'car-list-owners',
    component: CarListOwnerComponent
  },
  {
    path: 'car-add',
    component: CarEditComponent
  },
  {
    path: 'car-edit/:id',
    component: CarEditComponent
  },
  {
    path: 'owner-list',
    component: OwnerListComponent
  },
  {
    path: 'owners/:id',
    component: OwnerEditComponent
  },
  {
    path: 'owner-add',
    component: OwnerEditComponent
  },
  {
    path: '**',
    component: CarListOwnerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
