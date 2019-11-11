import { Component, OnInit } from '@angular/core';
import {TESTDATA} from '../models/testdata';
import {ExcelService} from '../services/excel.service';
//import * as Handsontable from 'handsontable';
import Handsontable from 'handsontable';
import { HotTableRegisterer } from '@handsontable/angular';
import { formatDate } from '@angular/common';
import {ReadExpenseFromExcel} from '../read-expense-from-excel';


@Component({
  selector: 'app-expensegrid',
  templateUrl: './expensegrid.component.html',
  styleUrls: ['./expensegrid.component.css']
})
export class ExpensegridComponent implements OnInit {
testdata:any[];
testdatanew:ReadExpenseFromExcel[];
hotRegisterer:HotTableRegisterer;
id:string;
hotSettings: Handsontable.GridSettings;
setter:boolean;

  constructor(private excelservice: ExcelService) {
    this.testdatanew=[];
    this.hotRegisterer=new HotTableRegisterer();
    this.id='hotInstance';
    // maps function to lookup string
    Handsontable.renderers.registerRenderer('negativeValueRenderer', this.negativeValueRenderer);
    this.setter=false;
    this.hotSettings = {

      afterChange: (changes, source) => {
        
        console.log('changes', changes[0]);
        console.log('changes', changes[0][0]);
        console.log('source', source);
        if (!this.setter) {
          this.setter = true;
          
          if (changes[0][1] == "PaymentMethod" && changes[0][3] == "cheque") {
            this.hotRegisterer.getInstance(this.id).setDataAtCell([[changes[0][0], 8, ''], [changes[0][0], 11, ''], [changes[0][0], 13, '']]);
          }
          else if (changes[0][1] == "PaymentMethod" && changes[0][3] == "cash") {
            this.hotRegisterer.getInstance(this.id).setDataAtCell([[changes[0][0], 9, ''], [changes[0][0], 10, ''],[changes[0][0], 11, ''], [changes[0][0], 13, '']]);
          }
          else if (changes[0][1] == "PaymentMethod" && changes[0][3] == "demanddraft") {
            this.hotRegisterer.getInstance(this.id).setDataAtCell([[changes[0][0], 8, ''], [changes[0][0], 9, ''],[changes[0][0], 10, '']]);
          }
          //
          let _paymentmethod = this.hotRegisterer.getInstance(this.id).getCell(changes[0][0], 6);

          if (_paymentmethod.innerText.toLowerCase() == "cash") {
            this.hotRegisterer.getInstance(this.id).setDataAtCell([[changes[0][0], 9, ''], [changes[0][0], 10, ''], [changes[0][0], 11, ''], [changes[0][0], 13, '']]);
          }
          else if (_paymentmethod.innerText.toLowerCase() == "cheque") {
            this.hotRegisterer.getInstance(this.id).setDataAtCell([[changes[0][0], 8, ''], [changes[0][0], 11, ''], [changes[0][0], 13, '']]);
          }
          else if (_paymentmethod.innerText.toLowerCase() == "demanddraft") {
            this.hotRegisterer.getInstance(this.id).setDataAtCell([[changes[0][0], 8, ''], [changes[0][0], 9, ''], [changes[0][0], 10, '']]);
          }
          //
          let _applicabletounit = this.hotRegisterer.getInstance(this.id).getCell(changes[0][0], 3);
          if (_applicabletounit.innerText.toLowerCase() != "singleunit" || _applicabletounit.innerText.toLowerCase() != "single unit") {
            this.hotRegisterer.getInstance(this.id).setDataAtCell([[changes[0][0], 18, '']]);
          }

          if (changes[0][1] == "SelectUnit") {
            let _applicabletounit1 = this.hotRegisterer.getInstance(this.id).getCell(changes[0][0], 3);
            //console.log(this.hotRegisterer.getInstance(this.id).getCell(changes[0][0], 3));
            if (_applicabletounit1.innerText.toLowerCase() != "singleunit" || _applicabletounit1.innerText.toLowerCase() != "single unit") {
              console.log('test');
              this.hotRegisterer.getInstance(this.id).setDataAtCell(changes[0][0], 18, '');
            }
          }
          //
        } else {
          this.setter = false;
        }
      },
      renderer: function (instance, td, row, col, prop, value, cellProperties) {

        cellProperties.renderer = "negativeValueRenderer"; // uses lookup map

        return td;
      }

    }
    //
    this.excelservice.excelinjson['Sheet1'].forEach(element => {
      this.testdatanew.push(new ReadExpenseFromExcel(element['Expense Head'],
        element['Expense Description'],
        element['Expense Recurrence Type'],
        element['Applicable to Unit'],
        element['Expense Type'],
        element['Distribution Type'],
        element['Payment Method'],
        element['Select Bank'],
        element['Voucher No'],
        element['Cheque No'],
        formatDate(element['Cheque Date'], 'dd/MM/yyyy', 'en'),
        element['Demand Draft No'],
        element['Amount'],
        formatDate(element['Demand Draft Date'], 'dd/MM/yyyy', 'en'),
        element['Payee Name'],
        element['Payee Bank Name'],
        formatDate(element['Expenditure Date'], 'dd/MM/yyyy', 'en'),
        element['InvoiceNoReceiptNo'],
        element['Select Unit']))
    });
    console.log(this.testdatanew);
    //
    this.testdata=[{
      "ExpenseHead":this.excelservice.excelinjson['Sheet1'][0]['Expense Head'],
      "ExpenseDescription":this.excelservice.excelinjson['Sheet1'][0]['Expense Description'],
      "ExpenseRecurrenceType":this.excelservice.excelinjson['Sheet1'][0]['Expense Recurrence Type'],
      "ApplicableToUnit":this.excelservice.excelinjson['Sheet1'][0]['Applicable to Unit'],
      "ExpenseType":this.excelservice.excelinjson['Sheet1'][0]['Expense Type'],
      "DistributionType":this.excelservice.excelinjson['Sheet1'][0]['Distribution Type'],
      "PaymentMethod":this.excelservice.excelinjson['Sheet1'][0]['Payment Method'],
      "SelectBank":this.excelservice.excelinjson['Sheet1'][0]['Select Bank'],
      "VoucherNo":this.excelservice.excelinjson['Sheet1'][0]['Voucher No'],
      "ChequeNo":this.excelservice.excelinjson['Sheet1'][0]['Cheque No'],
      "ChequeDate":formatDate(this.excelservice.excelinjson['Sheet1'][0]['Cheque Date'], 'dd/MM/yyyy', 'en'),
      "DemandDraftNo":this.excelservice.excelinjson['Sheet1'][0]['Demand Draft No'],
      "Amount":this.excelservice.excelinjson['Sheet1'][0]['Amount'],
      "DemandDraftDate":formatDate(this.excelservice.excelinjson['Sheet1'][0]['Demand Draft Date'], 'dd/MM/yyyy', 'en'),
      "PayeeName":this.excelservice.excelinjson['Sheet1'][0]['Payee Name'],
      "PayeeBankName":this.excelservice.excelinjson['Sheet1'][0]['Payee Bank Name'],
      "ExpenditureDate":formatDate(this.excelservice.excelinjson['Sheet1'][0]['Expenditure Date'], 'dd/MM/yyyy', 'en'),
      "InvoiceNoReceiptNo":this.excelservice.excelinjson['Sheet1'][0]['InvoiceNoReceiptNo'],
      "SelectUnit":this.excelservice.excelinjson['Sheet1'][0]['Select Unit']
    }];

   }

  ngOnInit() {
    //this.testdata=this.excelservice.excelinjson['Sheet1'];
    //this.testdata.push(this.excelservice.excelinjson['Sheet1'][0]);
    console.log(this.testdata);
    //this.dataset.push(this.testdata);
    //console.log(this.dataset);
  }

  negativeValueRenderer(instance, td, row, col, prop, value, cellProperties) {
    console.log('instance',instance);
    console.log('row',row);
    console.log('col',col);
    console.log('prop',prop);
    console.log('value',value);
    console.log('cellProperties',cellProperties);

    Handsontable.renderers.TextRenderer.apply(this, arguments);
  
    // if row contains negative number
    if (parseInt(value, 10) < 0) {
      // add class "negative"
      td.className = 'make-me-red';
    }
  
    if (!value || value === '') {
      td.style.background = '#FFFFFF';
    }
    else {
      if (value === 'Hai') {
        td.style.fontStyle = 'italic';
      }
      td.style.background = '';
    }
    //
    if(prop == 'PaymentMethod'){
      console.log(value.toLowerCase());
      if (value.toLowerCase() == 'cheque') {
        console.log('yes col 8');
      }
    }
  }

  commitAllExpense(){
    console.log(this.hotRegisterer.getInstance(this.id).countRows());
    console.log(this.hotRegisterer.getInstance(this.id).getData());
    let jsonData=this.hotRegisterer.getInstance(this.id).getData();
    //this.addExpFromXlsx(jsonData);
  }

 /* addExpFromXlsx(jsonData){

    switch (jsonData['Sheet1'][0]['Payment Method']) {
      case 'Cash':
        this.pmid = 1;
      case 'Cheque':
        this.pmid = 2;
      case 'Demand Draft':
        this.pmid = 3;
      case 'OnlinePay':
        this.pmid = 4;
    }
   this.expensedataXlsx.EXHead=jsonData['Sheet1'][0]['Expense Head'];//:string;
   this.expensedataXlsx.EXDesc=jsonData['Sheet1'][0]['Expense Description'];//:string;
   this.expensedataXlsx.EXDate=formatDate(jsonData['Sheet1'][0]['Expenditure Date'], 'yyyy/MM/dd', 'en');//:string;
   this.expensedataXlsx.EXPAmnt=jsonData['Sheet1'][0]['Amount'];//:number;
   this.expensedataXlsx.EXApplTO=jsonData['Sheet1'][0]['Applicable to Unit'];//:string;
   this.expensedataXlsx.EXRecurr=jsonData['Sheet1'][0]['Expense Recurrence Type'];//:string;
   this.expensedataXlsx.EXType=jsonData['Sheet1'][0]['Expense Type'];//:string;
   this.expensedataXlsx.BABName=jsonData['Sheet1'][0]['Select Bank'];//:string;
   this.expensedataXlsx.PMID=this.pmid;//:string;
   this.expensedataXlsx.EXPName=jsonData['Sheet1'][0]['Payee Name'];//:string;
   this.expensedataXlsx.EXPBName=jsonData['Sheet1'][0]['Payee Bank Name'];//:string;
   this.expensedataXlsx.EXChqNo=jsonData['Sheet1'][0]['Cheque No'];//:number;
   this.expensedataXlsx.EXChqDate=formatDate(jsonData['Sheet1'][0]['Cheque Date'], 'yyyy/MM/dd', 'en');//:string;
   this.expensedataXlsx.INNumber=jsonData['Sheet1'][0]['InvoiceNoReceiptNo'];//:string;
   //this.expensedataXlsx.EXPyCopy='';//:string;
    //VNName:string;
    //this.expensedataXlsx.INGenDate //:Date;
    this.expensedataXlsx.EXDisType=jsonData['Sheet1'][0]['Distribution Type']; //:string;
    this.expensedataXlsx.UnUniIden=jsonData['Sheet1'][0]['Select Unit']; //:string;
    this.expensedataXlsx.BLBlockID=this.viewexpensesservice.currentBlockId; //:string;
    this.expensedataXlsx.ASAssnID=this.currentAssociationID; //:string;
    this.expensedataXlsx.EXDDNo=jsonData['Sheet1'][0]['Demand Draft No'];//:number;
    this.expensedataXlsx.EXDDDate=formatDate(jsonData['Sheet1'][0]['Demand Draft Date'], 'yyyy/MM/dd', 'en');//:string;
    console.log('expensedataXlsx',this.expensedataXlsx);
    this.addexpenseservice.createExpense(this.expensedataXlsx)
      .subscribe(
        () => {
          this.viewexpensesservice.currentBlockId = this.expensedataXlsx.BLBlockID;
          swal.fire({
            title: "Expense Added Successfully",
            text: "",
            type: "success",
            showCancelButton: true,
            confirmButtonColor: "#f69321",
            confirmButtonText: "Add New Expense",
            cancelButtonText: "View Expense"
          }).then(
            (result) => {

              if (result.value) {
                //this.form.reset();
                this.resetForm();
              } else if (result.dismiss === swal.DismissReason.cancel) {
                this.router.navigate(['home/viewexpense']);
              }
            }
          )
        },
        () => {
          swal.fire('Error', 'Something went wrong!', 'error')
        }
      );
  } */

}
