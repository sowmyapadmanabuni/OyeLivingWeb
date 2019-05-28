import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
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
import {RouterModule} from '@angular/router';
import {AppRouting} from './app-routing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {ModalModule} from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NewAmenityComponent } from './new-amenity/new-amenity.component';
import { ViewreceiptComponent } from './viewreceipt/viewreceipt.component';
import { GenerateReceiptComponent } from './generate-receipt/generate-receipt.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
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
    GenerateReceiptComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AlertsModule,
    AngularFontAwesomeModule,
    Ng2SearchPipeModule,
    AppRouting,
    RouterModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    PaginationModule.forRoot(),
    NgxPaginationModule,
    ProgressbarModule.forRoot()
  ],
  providers: [ViewAssociationService, ViewBlockService, ViewUnitService, DashBoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
