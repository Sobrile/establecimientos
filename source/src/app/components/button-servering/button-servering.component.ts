import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-servering',
  templateUrl: './button-servering.component.html',
  styleUrls: ['./button-servering.component.css']
})
export class ButtonServeringComponent implements OnInit {

  @Input() label: String;
  @Input() servering: boolean;
  @Input() styleClass: String;
  @Input() show: boolean;
  @Input() disabled: boolean;
  @Input() confirmAction: boolean;
  @Output() onClickAction: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clickAction(event){
    if(this.onClickAction){
      this.onClickAction.emit(event);
    }
  }

}
