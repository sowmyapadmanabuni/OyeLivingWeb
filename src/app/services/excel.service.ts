import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs/dist/exceljs.min.js';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  workbook: ExcelJS.Workbook;
  worksheet: any;
  _unitlist:string[];
  excelinjson:any;

  constructor() { 
    this._unitlist=[];
    this.excelinjson={};
  }

  generateExcel(ascUnit) {
    //console.log(ascUnit.length);
    let _ascUnit = `"`;
    let _i=0;
    ascUnit.forEach(item => {
      _i += 1;
      //console.log(item['unUniName']);
      _ascUnit += `${item['unUniName']},`;
      //console.log(_i);
      if(_i == ascUnit.length){
        _ascUnit += `${item['unUniName']}"`;
      }
    })
    this._unitlist.push(_ascUnit);
    //console.log(this._unitlist);
    const data = [
      [2007, 1, "Volkswagen ", "Volkswagen Passat", 1267, 10],
      [2007, 1, "Toyota ", "Toyota Rav4", 819, 6.5],
      [2007, 1, "Toyota ", "Toyota Avensis", 787, 6.2],
      [2007, 1, "Volkswagen ", "Volkswagen Golf", 720, 5.7],
      [2007, 1, "Toyota ", "Toyota Corolla", 691, 5.4]
    ];
    //
    // Create workbook and worksheet
    this.workbook = new ExcelJS.Workbook();
    this.worksheet = this.workbook.addWorksheet('Sheet1');
    //
    this.worksheet.columns = [
      { header: 'Expense Head', key: 'ExpenseHead', width: 25, outlineLevel: 1  },
      { header: 'Expense Description', key: 'ExpenseDescription', width: 25, outlineLevel: 1  },
      { header: 'Expense Recurrence Type', key: 'ExpenseRecurrenceType', width: 25, outlineLevel: 1 },
      { header: 'Applicable to Unit', key: 'ApplicabletoUnit', width: 25, outlineLevel: 1 },
      { header: 'Expense Type', key: 'ExpenseType', width: 25, outlineLevel: 1 },
      { header: 'Distribution Type', key: 'DistributionType', width: 25, outlineLevel: 1 }, //F2
      { header: 'Payment Method', key: 'PaymentMethod', width: 25, outlineLevel: 1 }, //G2
      { header: 'Select Bank', key: 'SelectBank', width: 25, outlineLevel: 1 }, //H2
      { header: 'Voucher No', key: 'VoucherNo', width: 25, outlineLevel: 1 }, //I2
      { header: 'Cheque No', key: 'ChequeNo', width: 25, outlineLevel: 1 }, //J2
      { header: 'Cheque Date', key: 'ChequeDate', width: 25, outlineLevel: 1,style: { numFmt: 'dd/mm/yyyy' } }, //K2
      { header: 'Demand Draft No', key: 'DemandDraftNo', width: 25, outlineLevel: 1 }, //L2
      { header: 'Amount', key: 'Amount', width: 25, outlineLevel: 1 }, //M2
      { header: 'Demand Draft Date', key: 'DemandDraftDate', width: 25, outlineLevel: 1,style: { numFmt: 'dd/mm/yyyy' } }, //N2
      { header: 'Payee Name', key: 'PayeeName', width: 25, outlineLevel: 1 }, //O2
      { header: 'Payee Bank Name', key: 'PayeeBankName', width: 25, outlineLevel: 1 }, //P2
      { header: 'Expenditure Date', key: 'ExpenditureDate', width: 25, outlineLevel: 1,style: { numFmt: 'dd/mm/yyyy' } }, //Q2
      { header: 'InvoiceNoReceiptNo', key: 'InvoiceNoReceiptNo', width: 25, outlineLevel: 1 }, //R2
      { header: 'Select Unit', key: 'SelectUnit', width: 25, outlineLevel: 1 } //S2
    ];
    //
    let row1=this.worksheet.getRow(1);
    // Cell Style : Fill and Border
    row1.eachCell((cell, number) => {
       cell.fill = {
         type: 'pattern',
         pattern: 'solid',
         fgColor: { argb: 'FFA500' },
         bgColor: { argb: 'FFA500' }
       }
       cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
     }); 
    // Add Data and Conditional Formatting
   /* data.forEach(d => {
      let row = this.worksheet.addRow(d);
      let qty = row.getCell(5);
      let color = 'FF99FF99';
      if (+qty.value < 500) {
        color = 'FF9999'
      }
      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color }
      }}); */
    //
    this.worksheet.getCell('A2').dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: ['"Corpus,Generator,Common Area Electric Bill,Security Fees,HouseKeeping,Fixed Maintenance,One Time Onboarding fee,One Time Membership fee,Water Meter,Renting Fees,Unsold Rental Fees,One Time Occupancy Fees"']
    };
    //
    this.worksheet.getCell('B2').note = `Enter Description`;
    //
    this.worksheet.getCell('C2').dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: ['"Monthly,Quaterly,HalfYearly,Annually"']
    };
    //
    this.worksheet.getCell('D2').dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: ['"All Units,Single Unit,All Sold Owner Occupied Units,All Sold Tenant Occupied Units,All Sold Vacant Units,Unsold Vacant Units,Unsold Tenant Occupied Units,All Sold Units,All UnSold Units,All Occupied Units,All Vacant Unit"']
    };
    //
    this.worksheet.getCell('E2').dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: ['"Fixed,Variable"']
    };
    //
    this.worksheet.getCell('F2').dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: ['"Dimension Based,Per Unit"']
    };
    //
    this.worksheet.getCell('G2').dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: ['"Cash,Cheque,DemandDraft,OnlinePay"']
    };
    //
    this.worksheet.getCell('H2').dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: ['"Allahabad Bank,Andhra Bank,Bank of Baroda,Bank of India,Bank of Maharashtra,Canara Bank,Central Bank of India,Corporation Bank,Indian Bank,Indian Overseas Bank,Oriental Bank of Commerce,Punjab and Sind Bank,Punjab National Bank,State Bank of India,Syndicate Bank,UCO Bank,Union Bank of India,United Bank of India,Catholic Syrian Bank,City Union Bank,DCB Bank,Dhanlaxmi Bank,Federal Bank,HDFC Bank,ICICI Bank,IDFC First Bank,IndusInd Bank,Jammu & Kashmir Bank,Karnataka Bank,Karur Vysya Bank,Kotak Mahindra Bank,Lakshmi Vilas Bank,Nainital Bank,RBL Bank,South Indian Bank,Tamilnad Mercantile Bank Limited,Yes Bank,IDBI Bank"']
    };
    //
    this.worksheet.getCell('I2').note = `Enter Voucher Number`;
    //
    this.worksheet.getCell('J2').note = `Enter Cheque Number`;
    //
    this.worksheet.getCell('K2').note = `Enter Cheque Date`;
    //
    this.worksheet.getCell('L2').note = `Enter Demand Draft Number`;
    //
    this.worksheet.getCell('M2').note = `Enter Amount`;
    //
    this.worksheet.getCell('N2').note = `Enter Demand Draft Date`;
    //
    this.worksheet.getCell('O2').note = `Enter Payee Name`;
    //
    this.worksheet.getCell('P2').dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: ['"Allahabad Bank,Andhra Bank,Bank of Baroda,Bank of India,Bank of Maharashtra,Canara Bank,Central Bank of India,Corporation Bank,Indian Bank,Indian Overseas Bank,Oriental Bank of Commerce,Punjab and Sind Bank,Punjab National Bank,State Bank of India,Syndicate Bank,UCO Bank,Union Bank of India,United Bank of India,Catholic Syrian Bank,City Union Bank,DCB Bank,Dhanlaxmi Bank,Federal Bank,HDFC Bank,ICICI Bank,IDFC First Bank,IndusInd Bank,Jammu & Kashmir Bank,Karnataka Bank,Karur Vysya Bank,Kotak Mahindra Bank,Lakshmi Vilas Bank,Nainital Bank,RBL Bank,South Indian Bank,Tamilnad Mercantile Bank Limited,Yes Bank,IDBI Bank"']
    };
    //
    this.worksheet.getCell('Q2').note = `Enter Expenditure Date`;
    //
    this.worksheet.getCell('R2').note = `Enter InvoiceNoReceiptNo`;
    //
    //console.log(_ascUnit);
    this.worksheet.getCell('S2').dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: this._unitlist
    };
    //
    this.workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Expenses.xlsx');
    });
  }
}
