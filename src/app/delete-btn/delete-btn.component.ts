import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'delete-btn',
  templateUrl: './delete-btn.component.html',
  styleUrls: ['./delete-btn.component.scss']
})
export class DeleteBtnComponent implements OnInit {

  @Input()
  itemsCount: number;

  @Output() 
  onClick = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  delete() {
    this.onClick.emit();
  }

}
