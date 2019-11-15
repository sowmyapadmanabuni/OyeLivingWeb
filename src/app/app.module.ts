import { BrowserModule ,Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import {AlertsModule} from 'angular-alert-module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {  HttpClientModule } from '@angular/common/http';
import { ViewAssociationService } from './view-association/view-association.service';
import { ViewBlockService } from './view-block/view-block.service';
import { ViewUnitService } from './view-unit/view-unit.service';
import { DashBoardService } from './dash-board/dash-board.service';
import { WordsPipe } from './pipes/words.pipe';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { PathNotFoundComponent } from './path-not-found/path-not-found.component';
import { ViewExpensesComponent } from './view-expenses/view-expenses.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import {AppRouting} from './app-routing';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {NgxPaginationModule} from 'ngx-pagination';
import { NewAmenityComponent } from './new-amenity/new-amenity.component';
import { ViewreceiptComponent } from './viewreceipt/viewreceipt.component';
import { GenerateReceiptComponent } from './generate-receipt/generate-receipt.component';
import { AddUnitComponent } from './add-unit/add-unit.component';
import { AddBlocksComponent } from './add-blocks/add-blocks.component';
import { ViewFloorsComponent } from './view-floors/view-floors.component';
import { BankComponent } from './bank/bank.component';
import { CheckInvoiceAndDueDateDirective } from './check-invoice-and-due-date.directive';

import {Ng2TelInputModule} from 'ng2-tel-input';
import { ReportComponent } from './report/report.component';
import { ViewreportComponent } from './viewreport/viewreport.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import {ViewBlockComponent} from './view-block/view-block.component';
import {DashBoardComponent} from './dash-board/dash-board.component';
import {ViewAssociationComponent} from './view-association/view-association.component';
import {ViewUnitComponent} from './view-unit/view-unit.component';

import { HomeComponent } from './home/home.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DefaultimagePipe } from './pipes/defaultimage.pipe';
import { ToastrModule } from 'ngx-toastr';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { CustomdatePipe } from './pipes/customdate.pipe';
import {NgxPrinterModule} from 'ngx-printer';
import { AddexpensexlsxComponent } from './addexpensexlsx/addexpensexlsx.component';
import { OrderModule } from 'ngx-order-pipe';
import { HotTableModule } from '@handsontable/angular';
import {ExpensegridComponent} from './expensegrid/expensegrid.component';
import { ReadBlockAndUnitxlsxComponent } from './read-block-and-unitxlsx/read-block-and-unitxlsx.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { environment } from '../environments/environment';
import { GuestComponent } from './guest/guest.component';
import { DeliveriesComponent } from './deliveries/deliveries.component';
import { StaffComponent } from './staff/staff.component';
import { AddFamilyMemberComponent } from './add-family-member/add-family-member.component';
import { AddVisitorComponent } from './add-visitor/add-visitor.component';
import { ViewVisitorComponent } from './view-visitor/view-visitor.component';
import { AddVehiclesComponent } from './add-vehicles/add-vehicles.component';
import { ViewVehiclesComponent } from './view-vehicles/view-vehicles.component';


@NgModule({
  declarations: [
    AppComponent,
    WordsPipe,
    AddExpenseComponent,
    PathNotFoundComponent,
    ViewExpensesComponent,
    ViewInvoiceComponent,
    AppComponent,
    ViewExpensesComponent,
    AddExpenseComponent,
    PathNotFoundComponent,
    ViewInvoiceComponent,
    WordsPipe,
    NewAmenityComponent,
    ViewreceiptComponent,
    GenerateReceiptComponent,
    AddUnitComponent,
    AddBlocksComponent,
    ViewFloorsComponent,
    BankComponent,
    CheckInvoiceAndDueDateDirective,
    ReportComponent,
    ViewreportComponent,
    LoginComponent,
    RegisterComponent,
    EditprofileComponent,
    ViewBlockComponent,
    DashBoardComponent,
    ViewAssociationComponent,
    ViewUnitComponent,
    HomeComponent,
    DefaultimagePipe,
    NewInvoiceComponent,
    CustomdatePipe,
    AddexpensexlsxComponent,
    ExpensegridComponent,
    ReadBlockAndUnitxlsxComponent,
    GuestComponent,
    DeliveriesComponent,
    StaffComponent,
    AddFamilyMemberComponent,
    AddVisitorComponent,
    ViewVisitorComponent,
    AddVehiclesComponent,
    ViewVehiclesComponent
  ],
  imports: [
    BrowserModule,
    NgxQRCodeModule,
    FormsModule,
    HttpClientModule,
    AlertsModule,
    AngularFontAwesomeModule,
    Ng2SearchPipeModule,
    AppRouting,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    PaginationModule.forRoot(),
    NgxPaginationModule,
    Ng2TelInputModule,
    DatePickerModule,
    NgxPrinterModule.forRoot({printOpenWindow: false}),
    OrderModule,
    HotTableModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule
  ],
  providers: [ViewAssociationService, ViewBlockService, ViewUnitService, DashBoardService,Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
