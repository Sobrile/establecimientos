import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormField} from '../../../models/form-field';
import {FormButton} from '../../../models/form-button';
import {BsDatepickerConfig, BsLocaleService} from 'ngx-bootstrap/datepicker';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';


@Component({
    selector: 'app-form-dialog',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.css']

})
export class FormDialogComponent implements OnInit {

    //parameters component
    @Input() dialogTitle: string;
    public es: any;
    public error: string;
    @Input() displayDialog: boolean;
    @Output() displayDialogChange = new EventEmitter();

    @Input() fields: FormField[];

    @Input() buttons: FormButton[];

    @Input() elementToModify: any;
    @Input() errors: any;
    @Input() errorsForm: any;
    @Input() selectedItems: any;
    public msgs: string;
    public submitted: boolean;

    constructor(
        private _localeService: BsLocaleService,
        private _BsDatepickerConfig: BsDatepickerConfig,
        private _BsDatepickerModule: BsDatepickerModule
    ) {
    }

    ngOnInit() {

        this._BsDatepickerConfig.dateInputFormat = "DD/MM/Y";
        this.es = {
            firstDayOfWeek: 0,
            dayNames: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
            monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembrer", "Octubre", "Noviembre", "Diciembre"],
            monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"],
            today: 'Hoy',
            clear: 'Clear',
            dateFormat: 'dd/mm/yy'
        };
        this.emptyErrors();
    }

    getYear(fecha) {
        return fecha.getFullYear();
    }

    getMonth(date) {
        var month = date.getMonth() + 1;
        return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
    }

    getDate(date) {
        var day = date.getDate();
        return day < 10 ? '0' + day : '' + day; // ('' + month) for string result
    }

    onHide() {
        this.displayDialogChange.emit(this.displayDialog)
        this.emptyErrors()
    }
    emptyErrors() {
        this.errorsForm=[]
        this.fields.forEach(campo => {
            var dat = {
                valid: true,
                message: ""
            }
            this.errorsForm[campo.field] = dat;
        })
    }
    diaMin() {
        return new Date();
    }

    diaMax() {
        var now = new Date();
        return new Date(now.getFullYear() + 10, 0, 0);
    }

}
