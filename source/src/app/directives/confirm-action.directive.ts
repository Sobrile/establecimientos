import { Directive, EventEmitter, HostListener, OnInit, Input, Output  } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators';

import {ConfirmationService} from 'primeng/api';

@Directive({
  selector: '[appConfirmAction]'
})
export class ConfirmActionDirective implements OnInit {

  @Input() actionName: string;

  @Output() onParentClick = new EventEmitter();
  private clicks = new Subject();

  constructor(protected confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.clicks.pipe(
      // do something more
      /*debounceTime(500)*/
    ).subscribe(e => {
      this.confirmationService.confirm({
        message: '¿Está seguro de querer '+this.actionName.toLowerCase()+'?',
        accept: () => {
          //Actual logic to perform a confirmation
          return this.onParentClick.emit(e)
        }
      });

    });
  }

  @HostListener('click', ['$event'])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }

}
