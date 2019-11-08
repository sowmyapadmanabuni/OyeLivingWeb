import { Component, OnInit } from '@angular/core';
import {AddExpenseService} from '../services/add-expense.service';
import {ViewExpensesService} from '../services/view-expenses.service';
import * as XLSX from 'xlsx';
import * as Excel from 'exceljs';
import * as fs from 'file-saver';
import {ExcelService } from '../services/excel.service';
import { ExpenseData } from '../models/expense-data';
import { formatDate } from '@angular/common';
import { GlobalServiceService } from '../global-service.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addexpensexlsx',
  templateUrl: './addexpensexlsx.component.html',
  styleUrls: ['./addexpensexlsx.component.css']
})
export class AddexpensexlsxComponent implements OnInit {
  ascUnit:any[];
  pmid:any;
  expensedataXlsx:ExpenseData;
  currentAssociationID:string;
  
  constructor(private excelservice:ExcelService,
    private addexpenseservice:AddExpenseService,
    private viewexpensesservice:ViewExpensesService,
    private globalservice:GlobalServiceService,
    private router: Router) { 
      this.ascUnit=[];
      this.pmid=0;
      this.expensedataXlsx=new ExpenseData();
      this.currentAssociationID=this.globalservice.getCurrentAssociationId();
    }

  ngOnInit() {
    this.addexpenseservice.GetUnitListByBlockID(this.viewexpensesservice.currentBlockId)
    .subscribe(data => {
      this.ascUnit = data;
      console.log(this.ascUnit);
    })
  }

  Upload() {
    document.getElementById("file_upload_id").click();
  }
  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary',cellDates:true });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      //const dataString = JSON.stringify(jsonData);
      console.log(jsonData);
      this.excelservice.excelinjson=jsonData;
      //this.addExpFromXlsx(jsonData);
      this.router.navigate(['home/expensegrid']);
    }
    reader.readAsBinaryString(file); 
  } 

  generateExcel() {
    this.excelservice.generateExcel(this.ascUnit);
  }
  addExpFromXlsx(jsonData){

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
            cancelButtonColor: "#f69321",
            confirmButtonText: "Add New Expense",
            cancelButtonText: "View Expense"
          }).then(
            (result) => {

              if (result.value) {
                //this.form.reset();
                //this.resetForm();
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
  }

}
