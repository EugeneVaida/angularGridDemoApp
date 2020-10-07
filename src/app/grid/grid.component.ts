import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { AgGridAngular } from 'ag-grid-angular';


@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;
  title = 'angularGridDemoApp';
  searchString = '';
  heroes: any[];
  selectedRows: any[] = [];
  private gridApi;
  private gridColumnApi;

  constructor(private apiService: ApiService){}
  
  gridOptions = {
    defaultColDef: {
      editable: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100
    }    
  };

  columnDefs = [
    { field: 'id', checkboxSelection: true },
    { field: 'actualCompany', filter: 'agTextColumnFilter',  },
    { field: 'actualJobTitle', filter: 'agTextColumnFilter' },
    { field: 'combinedCandidateName', filter: 'agTextColumnFilter' },
    { 
      field: 'dateCreated', 
      filter: 'agDateColumnFilter'      
    },
    { field: 'email', filter: 'agTextColumnFilter' },
    { field: 'firstName',  filter: 'agTextColumnFilter'},
    { field: 'lastName', filter: 'agTextColumnFilter' },
    { field: 'level', filter: 'agNumberColumnFilter' }
  ];
  

  ngOnInit(){
    this.getData();
  }

  getData():void{
    this.apiService.getData().subscribe({
      next: result => this.heroes = result.data,
      complete: () => console.log('done')
    });
  }

  onSearchChange(newValue){
    this.apiService.searchBy(newValue).subscribe({
      next: result => this.heroes = result.data,
      complete: () => console.log('done')
    });
  }

  onCellValueChanged($event) {
    console.log($event);
    this.apiService.update($event.data).subscribe({
      next: result => console.log(result),
      complete: () => console.log(`${$event.data.id} deleted.`)
    });
  }  

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onSelectionChanged(event) {
    this.selectedRows = this.gridApi.getSelectedRows();
    console.log(this.selectedRows);
    
  }

  delete(){
    console.log('onDelete');
    this.selectedRows.map((selectedObj, index) => {
      this.apiService.delete(selectedObj.id).subscribe({
        next: result => {
          if(index + 1 === this.selectedRows.length){            
            this.getData()
            this.selectedRows = [];
          }
        },
        complete: () => console.log(`${selectedObj.id} deleted.`)
      });
    })
  }
}
