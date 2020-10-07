import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'grid-header',
  templateUrl: './grid-header.component.html',
  styleUrls: ['./grid-header.component.scss']
})
export class GridHeaderComponent implements OnInit {

  @Input()
  itemsCount: number;
  @Output() 
  onDelete = new EventEmitter()
  @Output()  
  onSearch = new EventEmitter()

  constructor() { }

  ngOnInit(): void {}

  delete():void{
    this.onDelete.emit();
  }

  search(quary):void{
    this.onSearch.emit(quary);
  }
}
