import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { ViewAssociationComponent } from './view-association/view-association.component';
import { ViewBlockComponent } from './view-block/view-block.component';
import { ViewUnitComponent } from './view-unit/view-unit.component';

const routes: Routes = [
  {path: '', component: DashBoardComponent},
  {path: 'dashboard', component: DashBoardComponent},
  {path: 'association', component: ViewAssociationComponent},
  {path: 'block', component: ViewBlockComponent},
  {path: 'unit', component: ViewUnitComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[ DashBoardComponent, ViewAssociationComponent, ViewBlockComponent,ViewUnitComponent];
