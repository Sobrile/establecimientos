import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormField} from '../../../models/form-field';
import {FormButton} from '../../../models/form-button';
import {BsDatepickerConfig, BsLocaleService} from 'ngx-bootstrap/datepicker';
import * as _ from 'lodash';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';


@Component({
    selector: 'app-add-usuario',
    templateUrl: './add-usuario.component.html',
    styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {
    _: any = _;
    //parameters component
    @Input() dialogTitle: string;
    public es: any;
    @Input() buscarCuil: Function;
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
        var errorAlta={
            valid: true,
            message: ""
        }
        this.errorsForm=[]
        this.errorsForm['errorAlta']=errorAlta;

    }


    reset() {

    }

    buscar(cuil) {
       this.buscarCuil(cuil);
    }
}
