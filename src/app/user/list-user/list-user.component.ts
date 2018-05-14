import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { UserService } from '../../core/services/user.service';
import { IUser } from '../../core/models/i-user.model';
import { IResponse } from '../../core/models/i-response.response';
import { IPaginator } from '../../core/models/i-paginator.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError} from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { Router } from '@angular/router';
import { ApplicationConstants } from '../../core/utils/application.constant';
import { IErrorResponse } from '../../core/models/i-error-response';
import { MessageConstants } from '../../core/utils/message.constant';
import { CatalogService } from '../../core/services/catalog.service';
import { CatalogConstants } from '../../core/utils/catalog.constant';
import { ICatalog } from '../../core/models/i-catalog.model';
import { ICatalogDetail } from '../../core/models/i-catalog-detail.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit  {
 
  searchForm: FormGroup = new FormGroup({});
  statusList: Array<ICatalogDetail>;
  numberRows: number = ApplicationConstants.DEFAULT_NUMBER_ROWS;
  isLoading: boolean;
  currentPage: number;
  displayedColumns = ['name', 'lastName', 'email', 'status', 'options'];
  dataSource: Array<IUser>;
  numberOfElements: number;
  totalElements: number;
  currentSort: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private router: Router,
    private catalogService: CatalogService
  ) { 
    this.init();
  }

  ngOnInit() { 
    this.loadSearchForm();
    this.loadStatusList();
    this.search();
    this.initCurrentPage();
    this.sortTable();
  }

  private init(){
    this.isLoading = false;
    this.currentPage = 0;
    this.numberOfElements = ApplicationConstants.DEFAULT_NUMBER_ROWS;
    this.totalElements = 0;
    this.currentSort = 'name,asc';
  }

  private loadSearchForm(){
    this.searchForm = new FormGroup({
      'name': new FormControl('', []),
      'lastName': new FormControl('', []),
      'email': new FormControl('', []),
      'status': new FormControl('', [])
    });
  }

  private loadStatusList(){
    this.catalogService.readByCode(CatalogConstants.CATALOG_LIST_STATUS)
      .subscribe(
        (response: IResponse<ICatalog>) => {
          this.statusList = response.data.catalogDetails;
        },
        (errorResponse: IErrorResponse) => {
        }
      );
  }

  public search(){
    this.isLoading = true;
    this.userService.search(this.generateSearchRequest(), this.generatePaginatorRequest()).subscribe(
      (response: IResponse<IPaginator<IUser>>) => {
        this.dataSource = response.data.content;
        this.totalElements = response.data.totalElements;
        this.isLoading = false;
      },
      (errorResponse: IErrorResponse) => {
        this.isLoading = false;
      }
    );
  }

  public clean(): void {
    this.searchForm.reset()
    this.loadSearchForm();
    this.init();  
    this.search();
  }

  private generateSearchRequest(): any{
    let params = {
      name: this.searchForm.controls.name.value,
      lastName: this.searchForm.controls.lastName.value,
      email: this.searchForm.controls.email.value,
      status: this.searchForm.controls.status.value
    };
    return params;
  }

  private generatePaginatorRequest(): any{
    var paginator = {
      page: this.paginator.pageIndex,
      size: this.numberRows,
      sort: this.currentSort,
    }
    return paginator;
  }

  private initCurrentPage(){
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  private sortTable(): void {
    merge(this.sort.sortChange, this.paginator.page)
    .subscribe(() => {
      this.currentSort = this.sort.direction ? this.sort.active+','+this.sort.direction : '';
      this.search();
    });
  }

  public goToUpdate(user: IUser) : void{
    this.router.navigate(['/users/update/', user._id]);
  }

  public goToCreate() : void{
    this.router.navigate(['/users/create/']);
  }

}
