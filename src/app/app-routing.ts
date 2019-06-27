import {NgModule} from '@angular/core'; 
import {RouterModule,Routes} from '@angular/router';
import {AddExpenseComponent} from './add-expense/add-expense.component';
import {ViewExpensesComponent} from './view-expenses/view-expenses.component';
import {PathNotFoundComponent} from './path-not-found/path-not-found.component';
import {ViewInvoiceComponent} from './view-invoice/view-invoice.component';
import {ViewreceiptComponent} from './viewreceipt/viewreceipt.component';
import {GenerateReceiptComponent} from './generate-receipt/generate-receipt.component';
import {AddUnitComponent} from './add-unit/add-unit.component';
import {AddBlocksComponent} from './add-blocks/add-blocks.component';
import {ViewFloorsComponent} from './view-floors/view-floors.component';
import {ViewBlockComponent} from './view-block/view-block.component';
import {ReportComponent} from './report/report.component';
import {ViewreportComponent} from './viewreport/viewreport.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'viewexpense', component: ViewExpensesComponent },
{ path: 'addexpense', component: AddExpenseComponent },
{ path: 'viewinvoice', component: ViewInvoiceComponent },
{ path: 'viewreceipt', component: ViewreceiptComponent },
{ path: 'generatereceipt', component: GenerateReceiptComponent },
{ path: 'addunit', component: AddUnitComponent },
{ path: 'addBlocks', component: AddBlocksComponent },
{ path: 'viewFloors', component: ViewFloorsComponent },
{ path: 'viewBlocks', component: ViewBlockComponent },
{ path: 'report', component: ReportComponent },
{ path: 'viewreport', component: ViewreportComponent },
{ path: '**', component: PathNotFoundComponent }]

@NgModule({
imports:[RouterModule.forRoot(routes)],
exports:[RouterModule]
})
export class AppRouting {

}
