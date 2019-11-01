import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {MessageService} from 'primeng/components/common/messageservice';
import {FormButton} from '../../../models/form-button';
import {CollapseOptions} from '../../../models/collapse-options';
import {MenuItem} from '../../../models/menu-item';
import {TableFiltered} from '../../../models/table-filtered';
import {BasePageComponent} from '../../components/base-page/base-page.component';
import {ConfigPagination} from '../../../models/config-pagination';
import {RolService} from '../../../services/rol.service';
import {PermisoService} from '../../../services/permiso.service';
import {ValidadorService} from '../../../services/validador.service';


@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.css'],
    providers: [RolService,ValidadorService]
})
export class RolesComponent extends BasePageComponent implements OnInit {
    buttons: FormButton[];
    actionButtons: FormButton[];
    public registro: any;
    public roles: any;
    public Rol: any;
    public msgs: string;
    cols: TableFiltered[];
    columnas: any[];
    brands: any[];
    colors: any[];
    yearFilter: number;
    yearTimeout: any;
    result: any;
    page: any;
    loading: boolean;
    displayDialog: boolean;
    tituloDialog: string;
    rol: any = {};
    selectedRegistro: any;
    newRol: boolean;
    calificaciones: any[];
    objetivos: any[];
    disabledFields: any[];
    public selectedEstado: any;
    public id: number;
    public errorMessage: any;
    public error: any;
    public confirmado;
    public camposBusqueda: any;
    public totalRecords: number;
    public errors: any;
    public errorsForm: any;
    public collapseOptions: CollapseOptions;
    public RegistrosPorPagina = 10;
    items: MenuItem[];
    public params: any;
    public config: ConfigPagination;
    public permisos: any;
    public permisosAsignados: any
    public expandedRol: any

    constructor(
        private _permisosService: PermisoService,
        private _validadorService: ValidadorService,
        private _rolService: RolService,
        private messageService: MessageService,
        private router: Router) {
        super(messageService);
    }

    ngOnInit() {
        this.loading = true;

        this.collapseOptions = {
            hidden: false,
            disabled: false
        }
        this.items = [
            {label: 'Editar', icon: 'pi pi-pencil', command: (event) => this.editarRegistro()},
            {label: 'Borrar', icon: 'pi pi-times', command: (event) => this.borrarRol()}

        ];
        this.disabledFields = ['estado_rol_evaluacion', 'comentarios', 'objectivo', 'definicion_objetivo'];
        var configCalendar = {}
        /***********configuro la tabla******************/
        this.config = {
            /*****registro por pagina *************/
            rowsPerPage: 10,
            allowGlobalSearch: false,
            allowServerSide: true
        }
        this.cols = [                                                              // ^[a-zA-Z áéíóú]+$
            {
                header: "Id",
                field: 'id',
                allowFiltered: true,
                input: "input",
                required: false,
                type: "nomber",
                disabled: false
            },
            {
                header: "Nombre",
                field: 'nombre',
                class: "ui-g-12",
                classPadre: "ui-g-12",
                input: "input",
                placeHolder: "Nombre",
                allowFiltered: true,
                required: true,
                pattern: '^[A-Z_]{5,20}$',
                type: "string",
                disabled: false
            },
            {
                header: "Descripcion",
                field: 'descripcion',
                class: "ui-g-12",
                classPadre: "ui-g-12",
                input: "textarea",
                placeHolder: "Descripcion",
                allowFiltered: true,
                required: true,
                //  pattern: '^[a-zA-Z0-9 /áéíóúÑñ]{5,20}$',
                type: "string",
                disabled: false
            },
            {
                header: "baja",
                field: 'baja',
                classPadre: "ui-g-12",
                class: "ui-g-12",
                type: "boolean",
                input: "checkbox",
                data: this.getTF(),
                disabled: false
            },
        ]
        this.columnas = this.cols;
        this.loading = true;
        this.buttons = [
            {
                class: "ui-button-success",
                icon: "fa fa-close",
                label: "Guardar",
                disabled: false,
                execute: this.save.bind(this)
            }


        ];
        this.actionButtons = [
            {
                class: "",
                icon: "fa fa-plus",
                label: "Agregar",
                disabled: false,
                execute: this.showDialogToAdd.bind(this)
            },

        ];

        this.loading = false;

    }

    Consulta(params) {
        this._rolService.getAllRolesUsingGET(params)
            .subscribe(resp => {
                    if (!resp) {

                        this.showError("error en el servidor")
                    } else {
                        this.roles = resp['body']['content'];
                    }
                },
                error => {

                    this.errorMessage = <any>error;
                    this.Log("error consulta ---->", this.errorMessage);
                    this.showError("Error Servidor Fuera de Servicio", this.errorMessage.message)
                    if (this.errorMessage.error['body'] && this.errorMessage.error['body'] != "") {
                        this.showError("error ", this.errorMessage.error['body'])
                    }

                });
    }

    ConsultaServer(event) {
        var page = 0;
        if (event.first > 0) {
            page = event.first / event.rows;
        }
        var sort = "";
        var orden = "";
        if (event.sortField && event.sortField != "") {
            event.sortField = this.toCamelCase(event.sortField);
            if (event.sortOrder == 1) {
                orden = "desc";
            } else {
                orden = "asc";

            }
            sort = event.sortField + "," + orden;
        } else {
            sort = "id,asc";
        }

        const params = {
            sort: sort,
            size: event.rows,
            page: page
        }
        this.params = params;
        var index;
        var col;
        for (index in event.filters) {
            col = this.getDataFromCol(index, this.cols)
            if (col.type == "date") {
                var date = this.getDatefromStr(event.filters[index].value, "ES");
                if (typeof date === "object") {
                    params[index] = this.convertirFechaBd(date);
                } else {
                    params[index] = event.filters[index].value;
                }
            } else {
                params[index] = event.filters[index].value;

            }

        }
        this.Consulta(params);

    }

    getDatefromStr(datestr, lang = "US") {
        if (typeof datestr === "string") {
            var dateArray;
            var year;
            var month;
            var day;

            if (lang == "ES") {
                dateArray = datestr.split("/")
                year = dateArray[2];
                month = dateArray[1];
                day = dateArray[0];

            } else {
                dateArray = datestr.split("-")
                year = dateArray[0];
                month = dateArray[1];
                day = dateArray[2];
            }
            return new Date(year + "-" + month + "-" + day + "T00:00:00-0300")
        } else {
            return datestr;
        }


    }

    getDataFromCol(index, cols) {
        var camp = {}
        var campo = {}
        cols.forEach(campo => {
            if (index == campo.field) {
                camp = campo
            }
        })
        return camp;
    }

    getDescripcionFromId() {
        var descripcion = ""
        this.roles.forEach(campo => {
            if (this.id == campo.id) {
                descripcion = campo.descripcion
            }
        })
        return descripcion
    }

    showDialogToAdd() {
        this.errors = [];
        this.newRol = true;
        this.rol = {};
        this.tituloDialog = "Alta Rol";
        this.displayDialog = true;
    }

    getErrores() {
        let c = 1;
        let str = "<ul>";
        this.errors.forEach(mensaje => {
            var index;
            str += mensaje + "<br>";
            c++;
        });
        return str;
    }

    mostrarErrores() {
        let c = 1;
        this.errors.forEach(mensaje => {
            var index;
            for (index in this.columnas) {
                this.columnas[c].error = true;
                this.columnas[c].mensaje = mensaje;
            }
            c++;
        });
    }

    altaRol(Rol) {
        this._rolService.AltaDeUnRol(Rol).subscribe(
            response => {
                this.result = response;
                if (!this.result) {

                    this.showError("error en el servidor")
                } else {
                    this.rol = null;
                    this.displayDialog = false;
                    this.showSuccess("Alta dada ok")
                    this.refresh()

                }
            },
            error => {
                this.errorMessage = <any>error;
                this.Log("error alta ---->", this.errorMessage);
                if (this.errorMessage.error && this.errorMessage.error['body'] && this.errorMessage.status && this.errorMessage.status == 400) {
                    var error = this.errorMessage.error['body'];
                    this.showError("Error",error)
                    this.Log("error alta ---->", error);
                }
            })

    }

    onRowSelect(event) {


    }

    editarRegistro() {
        this.errors = [];
        /******habilito todos los campos para la modificacion ******/
        this.newRol = false;
        /*******bajos los estados disponibles para un id de rol*******/
        this.rol = this.cloneEvaluacion(this.selectedRegistro);
        this.tituloDialog = "Editar Rol";
        this.displayDialog = true;
    }

    onRowMenuSelect(event) {
        this.registro = event.data;
        this.id = event.data.id;
    }

    getYear(fecha) {
        if (fecha instanceof Date) {
            return fecha.getFullYear();
        } else {
            return fecha
        }
    }

    cloneEvaluacion(c: any):
        any {
        let rolEvaluacion = {};
        for (let prop in c) {
            rolEvaluacion[prop] = c[prop];
        }
        return rolEvaluacion;
    }

    convertToString(estado) {
        if (typeof estado === "object") {
            return estado.value;
        }
        return estado;
    }

    guardaRol(Rol) {
        const params = {
            rolEditDto: Rol,
            id: Rol.id
        }
        this._rolService.EditarUnRol(params).subscribe(
            response => {

                this.result = response;
                if (!this.result) {
                    alert('error en el servidor');
                } else {
                    if (this.result && !!this.result['body'] && this.result['body'].id) {
                        this.rol = null;
                        this.displayDialog = false;
                        this.refresh();
                        this.showSuccess("Registro " + this.result['body'].nombre + " modificado ok")

                    }
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.Log("error ", this.errorMessage);
                if (this.errorMessage.error && this.errorMessage.error['body'] && this.errorMessage.status) {
                    var resp = this.errorMessage.error['body'];

                    if (typeof resp === "string") {
                        this.showError("error de Guardado",resp)

                    } else {
                        this.errors = this.errorMessage.error['body'];
                    }
                    this.Log("error modificacion ---->", this.errors);

                }
            }
        );

    }
    save(rol) {
        if (this._validadorService.validarCampos(rol,this.columnas) == true) {
            if (this.newRol == false) {
                this.guardaRol(rol);
            } else {
                this.altaRol(rol);
            }
            this.refresh();
        } else {
            this.errorsForm=this._validadorService.getErrorForm();
            this.showError("Error en la carga de datos ", "")
        }
    }

    refresh() {
        this.Consulta(this.params);
    }
    onRowExpand(event) {
        this.getPermisos();
        this.expandedRol = event.data;
        this.permisosAsignados = event.data.permisos;
      }

    getPermisos() {
        const params = {
            sort: "",
            size: 100000,
            page: 0

        }
        this.permisos = []
        this.permisosAsignados = []
        var permisos = []
        this._permisosService.getAllPermisosUsingGET(params)
            .subscribe(resp => {
                    if (!resp) {
                        this.showError("error en el servidor")
                    } else {

                        permisos = resp['body']['content']

                        var enc = false;
                        permisos.forEach(permiso => {

                            if (this.expandedRol.permisos.find(permisof => permisof.id == permiso.id)) {

                            } else {
                                this.permisos.push(permiso);
                            }
                        })


                    }
                },
                error => {

                    this.errorMessage = <any>error;
                    this.Log("error consulta  permisos---->", this.errorMessage);
                    this.showError("Error Servidor Fuera de Servicio", this.errorMessage.message)
                    if (this.errorMessage.error && this.errorMessage.error['body'] != "undefined" && this.errorMessage.error['body'] != "") {
                        this.showError("error ", this.errorMessage.error)
                    }

                });
    }

    addPermiso(event: any) {
        event.items.forEach(permiso => {
            var params = {
                idPermiso: permiso.id,
                id: this.expandedRol.id
            }
            this._rolService.agregaUnPermisoAUnRol(params)
                .subscribe(resp => {
                        if (!resp) {
                            this.showError("error en el servidor")
                        } else {
                            this.permisosAsignados = resp['body'].permisos
                        }
                    },
                    error => {
                        this.errorMessage = <any>error;
                        this.Log("error add permiso  permisos---->", this.errorMessage);
                        this.showError("Error Servidor Fuera de Servicio", this.errorMessage.message)
                        if (this.errorMessage.error && this.errorMessage.error['body'] != "undefined" && this.errorMessage.error['body'] != "") {
                            this.showError("error ", this.errorMessage.error)
                        }
                    });
        })
    }

    delPermiso(event: any) {
        event.items.forEach(permiso => {
            var params = {
                idPermiso: permiso.id,
                id: this.expandedRol.id
            }
             this._rolService.sacaUnPermisoAUnRol(params)
                .subscribe(resp => {
                        if (!resp) {
                            this.showError("error en el servidor")
                        } else {
                            this.permisosAsignados = resp['body'].permisos
                        }
                    },
                    error => {
                        this.errorMessage = <any>error;
                        this.Log("error consulta  permisos del---->", this.errorMessage);
                        this.showError("Error Servidor Fuera de Servicio", this.errorMessage.message)
                        if (this.errorMessage.error && this.errorMessage.error['body'] != "undefined" && this.errorMessage.error['body'] != "") {
                            this.showError("error ", this.errorMessage.error)
                        }
                    });
        })
    }

    borrarRol() {
        if (this.id && this.id > 0) {
            this._rolService.BorrarUnRol(this.id).subscribe(
                response => {
                    if (!response) {
                        this.showError("error en el servidor")
                    } else {
                        if (response['body'] && response['body'] == true) {
                            this.refresh();
                        } else {
                            this.showSuccess("ok ", "Rol borrado ok")
                        }
                    }
                },
                error => {
                    this.errorMessage = <any>error;
                    this.Log("error delete ---->", this.errorMessage);
                    if (this.errorMessage.error['body'] && this.errorMessage.error['body'] != "") {
                        this.showError("error ", this.errorMessage.error['body'])
                    }

                }
            );
        }
    }
}
