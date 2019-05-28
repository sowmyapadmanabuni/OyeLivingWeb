import { Component, OnInit } from '@angular/core';
import { AddExpenseService } from '../services/add-expense.service';
import { ViewExpensesService } from '../services/view-expenses.service';
import { BlocksByAssoc } from '../models/blocks-by-assoc';
import { Router } from '@angular/router';
import { PurchaseOrdersByAssoc } from '../models/purchase-orders-by-assoc';
import { UnitsByBlockID } from '../models/units-by-block-id';
import { ExpenseData } from '../models/expense-data';
import swal from 'sweetalert2';
import { ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  blockID: number;
  availableNoOfBlocks: number;
  allBlocksLists: BlocksByAssoc[];
  purchaseOrders: PurchaseOrdersByAssoc[];
  blockName: string;
  dateandTime: Date;
  purchaseorderid: string;
  applicableto: string;
  expenserecurrencetype: string;
  expensetype: string;
  expenseHead: object[];
  categories: object[];
  expensecategories: object[];
  applicabltToUnits: object[];
  distributionTypes: object[];
  expensehead: string;
  applies: string;
  distribution: string;
  ascUnit: UnitsByBlockID[];
  unitid: number;
  unit: string;
  methodArray: object[];
  checkField: string;
  paybymethod: string;
  selectedFile: File;
  expensedata: ExpenseData;
  allUnitListsByBlock: object;
  existingNoOfUnits: number;
  maxUnitsPerBlock: number;
  avialableUnitSpace: number;
  @ViewChild('addExpense') form: any;
  minDate: Date;
  minDemandDraftDate: Date;
  bsConfig: object;
  EXDate: Date;
  EXChqDate: Date;
  EXDDDate: Date;
  bankList: string[];
  dynamic: number;
  isLargefile: boolean;
  isnotValidformat: boolean;
  disableButton: boolean;

  constructor(private addexpenseservice: AddExpenseService,
    private router: Router,
    private viewexpensesservice: ViewExpensesService) {
    this.expensedata = new ExpenseData();
    this.selectedFile = null;
    this.blockName = '';
    this.purchaseorderid = '';
    this.expensehead = '';
    this.expenserecurrencetype = '';
    this.applicableto = '';
    this.expensetype = '';
    this.distribution = '';
    this.unit = '';
    this.paybymethod = '';
    this.dateandTime = new Date();
    this.expensedata.ASAssnID = 1156;
    this.expensedata.BLBlockID = '';
    this.expensedata.POID = '';
    this.expensedata.EXHead = '';
    this.expensedata.EXRecurr = '';
    this.expensedata.EXApplTO = '';
    this.expensedata.EXType = '';
    this.expensedata.EXDisType = '';
    this.expensedata.UnUniIden = '';
    this.expensedata.PMID = '';
    this.expensedata.BABName = '';
    this.expensedata.EXPBName = '';
    this.avialableUnitSpace = 0;
    this.EXDate = null;
    this.EXChqDate = null;
    this.EXDDDate = null;
    this.dynamic = 0;
    this.isLargefile = false;
    this.isnotValidformat = false;
    this.disableButton = false;

    this.expenseHead = [
      { 'name': '', 'displayName': 'Corpus', 'id': 1 },
      { 'name': '', 'displayName': 'Generator', 'id': 2 },
      { 'name': '', 'displayName': 'Common Area Electric Bill', 'id': 3 },
      { 'name': '', 'displayName': 'Security Fees', 'id': 4 },
      { 'name': '', 'displayName': 'HouseKeeping', 'id': 5 },
      { 'name': '', 'displayName': 'Fixed Maintenance', 'id': 6 }
    ]

    this.categories = [
      { "name": "Monthly", "displayName": "Monthly", "id": 1 },
      { "name": "Quaterly", "displayName": "Quaterly", "id": 3 },
      { "name": "HalfYearly", "displayName": "Half Yearly", "id": 6 },
      { "name": "Annually", "displayName": "Annually", "id": 12 }
    ]

    this.expensecategories = [{ "name": "Fixed", "displayName": "Fixed", "id": 10 }, { "name": "Variable", "displayName": "Variable", "id": 11 }]

    this.applicabltToUnits = [
      { 'name': 'All', 'displayName': 'All Units' },
      { 'name': 'Single', 'displayName': 'Single Unit' },
      { 'name': 'SoldOwnerOccupied', 'displayName': 'Sold Owner-Occupied' },
      { 'name': 'SoldTenantOccupied', 'displayName': 'Sold Tenant-Occupied' },
      { 'name': 'SoldVacant', 'displayName': 'Sold Vacant' },
      { 'name': 'UnsoldVacant', 'displayName': 'Unsold Vacant' },
      { 'name': 'UnsoldTenant', 'displayName': 'Unsold Tenant-Occupied' },
      { 'name': 'AllSold', 'displayName': 'All Sold' },
      { 'name': 'AllUnSold', 'displayName': 'All UnSold' },
      { 'name': 'AllVacantUnits', 'displayName': 'All Vacant Units' },
      { 'name': ' AllOccupiedUnits', 'displayName': ' All Occupied Units' }
    ]

    this.methodArray = [{ 'name': 'Cash', 'displayName': 'Cash', 'id': 1 },
    { 'name': 'Cheque', 'displayName': 'Cheque', 'id': 2 },
    { 'name': 'DemandDraft', 'displayName': 'Demand Draft', 'id': 3 },
    { 'name': 'OnlinePay', 'displayName': 'OnlinePay', 'id': 4 }
    ]

    this.distributionTypes = [{ "name": "Dimension Based" }, { "name": "Per Unit" }, { "name": "Actuals" }];

    this.bankList = [
      'Allahabad Bank',
      'Andhra Bank',
      'Bank of Baroda',
      'Bank of India',
      'Bank of Maharashtra',
      'Canara Bank',
      'Central Bank of India',
      'Corporation Bank',
      'Indian Bank',
      'Indian Overseas Bank',
      'Oriental Bank of Commerce',
      'Punjab and Sind Bank',
      'Punjab National Bank',
      'State Bank of India',
      'Syndicate Bank',
      'UCO Bank',
      'Union Bank of India',
      'United Bank of India',
      'Catholic Syrian Bank',
      'City Union Bank',
      'DCB Bank',
      'Dhanlaxmi Bank',
      'Federal Bank',
      'HDFC Bank',
      'ICICI Bank',
      'IDFC First Bank',
      'IndusInd Bank',
      'Jammu & Kashmir Bank',
      'Karnataka Bank',
      'Karur Vysya Bank',
      'Kotak Mahindra Bank',
      'Lakshmi Vilas Bank',
      'Nainital Bank',
      'RBL Bank',
      'South Indian Bank',
      'Tamilnad Mercantile Bank Limited',
      'Yes Bank',
      'IDBI Bank'
    ]

    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());

    this.minDemandDraftDate = new Date();
    this.minDemandDraftDate.setDate(this.minDemandDraftDate.getDate() - 80);

    this.bsConfig = Object.assign({}, { containerClass: 'theme-orange' });

  }

  ngOnInit() {
    this.addexpenseservice.GetBlockListByAssocID()
      .subscribe(item => {
        this.allBlocksLists = item;
        this.availableNoOfBlocks = item.length;
        console.log('allBlocksLists', this.allBlocksLists);

      });

    this.addexpenseservice.GetPurchaseOrderListByAssocID()
      .subscribe(data => {
        console.log(data);
        this.purchaseOrders = data;
      });

    this.addexpenseservice.getAssociationList();
    //this.addexpenseservice.applicableTo('applicableTo');
  }
  poDetails(POID) {
    let purchaseOrders = this.purchaseOrders.find(po => po['poid'] == POID);
    console.log(purchaseOrders);
    this.expensedata.POEAmnt = purchaseOrders['poEstAmt'];
    this.expensedata.VNName = purchaseOrders['poPrfVen'];
    this.expensedata.BPIden = purchaseOrders['bpIden'];
    this.expensedata.EXRABudg = 0;
  }
  prerequisitesAddUnit(blBlockID) {
    console.log('prerequisitesAddUnit', blBlockID);
    this.blockID = blBlockID;
    let blockbyassoc = this.allBlocksLists.find(item => item['blBlockID'] == blBlockID);
    this.maxUnitsPerBlock = blockbyassoc['blNofUnit'];

    this.addexpenseservice.prerequisitesAddUnit(blockbyassoc['blBlockID'])
      .subscribe(data => {
        this.allUnitListsByBlock = data['data'];
        this.existingNoOfUnits = data['data']['unitsByBlockID'].length;
        this.avialableUnitSpace = this.maxUnitsPerBlock - this.existingNoOfUnits;
        console.log('avialableUnitSpace', this.avialableUnitSpace);
      },
        (response) => {
          console.log(response.message);
        });
  }
  gotoViewexpense() {
    this.router.navigate(['viewexpense']);
  }
  applicableTo(EXApplTO: string) {
    this.applies = EXApplTO;
    //  $scope.ascUnit = '';
    this.addexpenseservice.GetUnitListByBlockID(this.blockID)
      .subscribe(data => {
        this.ascUnit = data;
      })
  }

  onFileSelected(event) {
    this.isLargefile = false;
    this.isnotValidformat = false;
    this.disableButton = false;
    this.selectedFile = <File>event.target.files[0];
    console.log('file type', this.selectedFile['type']);

    if (this.selectedFile['type'] == "application/zip") {
      console.log('inside file type');
      this.isnotValidformat = true;
      this.disableButton = true;
    }

    if (this.selectedFile['size'] > 2000000) {
      console.log('inside file size');
      this.isLargefile = true;
      this.disableButton = true;
    }
    let splitarr = this.selectedFile['name'].split('.')
    let currentdate = new Date();
    let expycopy = splitarr[0] + '_' + currentdate.getTime().toString() + '.' + splitarr[1];

    this.expensedata.EXPyCopy = expycopy;
  }
  removeSelectedfile() {
    const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer();
    dataTransfer.items.add('', '');
    console.log('dataTransfer', dataTransfer);
    const inputElement: HTMLInputElement = document.getElementById('uploadFileinput') as HTMLInputElement;
    console.log('inputElement', inputElement.files);
    inputElement.files = dataTransfer.files;
    this.disableButton=false;
    this.isnotValidformat = false;
    this.isLargefile = false;
  }
  onUpLoad() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.expensedata.EXPyCopy);
    this.addexpenseservice.onUpLoad(fd)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log('Upload Progress: ' + Math.round(event.loaded / event.total * 100) + '%');
          this.dynamic = Math.round(event.loaded / event.total * 100);
        }
        else if (event.type === HttpEventType.Response) {
          console.log(event);
          this.dynamic = 0;
        }
      });
  }

  addExp() {

    this.expensedata.EXDate = formatDate(this.EXDate, 'yyyy/MM/dd', 'en');
    if (this.checkField == 'Cash') {
      this.expensedata.EXChqDate = null;
    }
    if (this.checkField == 'Cheque') {
      this.expensedata.EXChqDate = formatDate(this.EXChqDate, 'yyyy/MM/dd', 'en');
    }
    if (this.checkField == 'DemandDraft') {
      this.expensedata.EXChqDate = null;
      this.expensedata.EXDDDate = formatDate(this.EXDDDate, 'yyyy/MM/dd', 'en');
    }
    console.log('expensedata', this.expensedata);
    this.addexpenseservice.createExpense(this.expensedata)
      .subscribe(
        () => {
          this.viewexpensesservice.invoiceBlockid = this.expensedata.BLBlockID;
          console.log('viewexpensesservice.invoiceBlockid', this.viewexpensesservice.invoiceBlockid);
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
                this.router.navigate(['viewexpense']);
              }
            }
          )
        },
        () => {
          swal.fire('Error', 'Something went wrong!', 'error')
        }
      );
  }

  showMethod(PMID: string) {
    console.log(PMID);
    let paymentobj = this.methodArray.filter(item => item['id'] == PMID)
    this.checkField = paymentobj[0]['name'];
  }
  resetForm(e?) {
    if (e != undefined) {
      e.preventDefault();
    }
    this.form.reset();
    this.expensedata.POID = '';
    this.expensedata.EXHead = '';
    this.expensedata.EXRecurr = '';
    this.expensedata.EXApplTO = '';
    this.expensedata.EXType = '';
    this.expensedata.EXDisType = '';
    this.expensedata.UnUniIden = '';
    this.expensedata.PMID = '';
  }

}