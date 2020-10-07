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
  title : string = 'angularGridDemoApp';
  searchString : string = '';
  heroes: any[];
  selectedRows: any[] = [];
  private gridApi : any;  

  constructor(private apiService: ApiService){}
  
  gridOptions : Object = {
    defaultColDef: {
      editable: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100
    }    
  };

  columnDefs: any[] = [
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
  

  ngOnInit():void{
    this.getData();
  }

  getData():void{
    this.apiService.getData().subscribe({
      next: result => this.heroes = result.data,
      complete: () => console.log('done')
    });
  }

  onSearchChange(newValue: any):void{
    this.apiService.searchBy(newValue).subscribe({
      next: result => this.heroes = result.data,
      complete: () => console.log('done')
    });
  }

  onCellValueChanged(cell : any):void {
    this.apiService.update(cell.data).subscribe({
      next: result => console.log(result),
      complete: () => console.log(`${cell.data.id} changed.`)
    });
  }  

  onGridReady(params:any):void {
    this.gridApi = params.api;
  }

  onSelectionChanged(event:any):void {
    this.selectedRows = this.gridApi.getSelectedRows();
    console.log(this.selectedRows);
    
  }

  delete():void{
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
