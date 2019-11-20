import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ViewExpensesComponent } from './view-expenses/view-expenses.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { ViewreceiptComponent } from './viewreceipt/viewreceipt.component';
import { GenerateReceiptComponent } from './generate-receipt/generate-receipt.component';
import { AddUnitComponent } from './add-unit/add-unit.component';
import { AddBlocksComponent } from './add-blocks/add-blocks.component';
import { ViewFloorsComponent } from './view-floors/view-floors.component';
import { ViewBlockComponent } from './view-block/view-block.component';
import { ReportComponent } from './report/report.component';
import { ViewreportComponent } from './viewreport/viewreport.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { ViewAssociationComponent } from './view-association/view-association.component';
import { ViewUnitComponent } from './view-unit/view-unit.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { DeliveriesComponent } from './deliveries/deliveries.component';
import { AddVisitorComponent } from './add-visitor/add-visitor.component'
import { StaffComponent } from './staff/staff.component';
import { ViewVisitorComponent } from './view-visitor/view-visitor.component'
import { RegisterComponent } from './register/register.component';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { AddexpensexlsxComponent } from './addexpensexlsx/addexpensexlsx.component';
import { ExpensegridComponent } from './expensegrid/expensegrid.component';
import { GuestComponent } from './guest/guest.component';
import { AddVehiclesComponent } from './add-vehicles/add-vehicles.component'
import { ViewVehiclesComponent } from './view-vehicles/view-vehicles.component'
import { ReadBlockAndUnitxlsxComponent } from './read-block-and-unitxlsx/read-block-and-unitxlsx.component';
import { PaymentStatusComponent } from './payment-status/payment-status.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'association', component: ViewAssociationComponent },
    { path: 'payment-status', component: PaymentStatusComponent },
    {
        path: 'home', component: HomeComponent, canActivate: [AuthGuard],
                children: [

                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    { path: 'dashboard', component: DashBoardComponent },
                    { path: 'association', component: ViewAssociationComponent },
                    { path: 'viewBlocks', component: ViewBlockComponent },
                    { path: 'viewunit', component: ViewUnitComponent },
                    { path: 'guest', component: GuestComponent },
                    { path: 'deliveries', component: DeliveriesComponent },
                    { path: 'viewvisitor', component: ViewVisitorComponent },
                    { path: 'staff', component: StaffComponent },
                    { path: 'addguest', component: AddVisitorComponent },
                    { path: 'addvehicles', component: AddVehiclesComponent },
                    { path: 'viewvehicles', component: ViewVehiclesComponent },
                    { path: 'viewexpense', component: ViewExpensesComponent },
                    { path: 'viewinvoice', component: ViewInvoiceComponent },
                    { path: 'viewreceipt', component: ViewreceiptComponent },
                    { path: 'addexpense', component: AddExpenseComponent },
                    { path: 'generatereceipt', component: GenerateReceiptComponent },
                    { path: 'addunit', component: AddUnitComponent },
                    { path: 'addBlocks', component: AddBlocksComponent },
                    { path: 'viewFloors', component: ViewFloorsComponent },
                    { path: 'report', component: ReportComponent },
                    { path: 'viewreport', component: ViewreportComponent },
                    { path: 'editprofile', component: EditprofileComponent },
                    { path: 'newinvoice/:inid/:inGenDate/:inNumber/:inDsCVal/:unUnitID', component: NewInvoiceComponent },
                    { path: 'newinvoice', component: NewInvoiceComponent },
                    { path: 'addexpensexlsx', component: AddexpensexlsxComponent },
                    { path: 'expensegrid', component: ExpensegridComponent },
                    { path: 'addblockunitxlsx', component: ReadBlockAndUnitxlsxComponent }]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouting {

}
