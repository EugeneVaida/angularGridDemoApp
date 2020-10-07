import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'grid-form',
  templateUrl: './grid-form.component.html',
  styleUrls: ['./grid-form.component.scss']
})
export class GridFormComponent implements OnInit {

  @Output()
  onSearch = new EventEmitter()
  
  searchCtrl = new FormControl();

  gridForm = new FormGroup({
    search: this.searchCtrl
  });

  constructor() { }

  ngOnInit(): void {
    this.gridForm.get("search").valueChanges.subscribe(searchQuary => {
      this.onSearch.emit(searchQuary);
    });
  }

  clearSearchInput():void{
    this.searchCtrl.setValue('');
  }

}
