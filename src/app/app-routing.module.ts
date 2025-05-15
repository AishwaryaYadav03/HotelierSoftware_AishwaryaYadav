import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeatingComponent } from './components/seating/seating.component';
import { ShowSeatingComponent } from './components/show-seating/show-seating.component';

const routes: Routes = [
  {path:'',component:SeatingComponent},
  {path:'show-seating',component:ShowSeatingComponent},
  { path: 'seating/edit', component: SeatingComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
