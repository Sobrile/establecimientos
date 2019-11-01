import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {UsuarioService} from '../../../services/usuario.service';
import {RolService} from '../../../services/rol.service';
import {MessageService} from 'primeng/components/common/messageservice';
import {FormButton} from '../../../models/form-button';
import {CollapseOptions} from '../../../models/collapse-options';
import {MenuItem} from '../../../models/menu-item';
import {BasePageComponent} from '../../components/base-page/base-page.component';
import {ValidadorService} from '../../../services/validador.service';


@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css'],
    providers: [UsuarioService, RolService, ValidadorService]
})
export class UsuariosComponent extends BasePageComponent implements OnInit {
    _: any = _;
    Agregar100: any;
    buttons: FormButton[];
    actionButtons: FormButton[];
    public registro: any;
    public usuarios: any;
    public Usuario: any;
    public expandedUser: any;
    public msgs: string;
    public roles: any[];
    public rolesAsignados: any[];
    cols: any[];
    columnas: any[];
    brands: any[];
    colors: any[];
    yearFilter: number;
    yearTimeout: any;
    result: any;
    page: any;
    displayData: boolean;
    loading: boolean;
    displayDialog: boolean;
    displayDialogAlta: boolean;
    tituloDialog: string;
    usuario: any = {};
    selectedRegistro: any;
    newUsuario: boolean;
    calificaciones: any[];
    objetivos: any[];
    disabledFields: any[];
    public selectedEstado: any;
    public camposUsuario: any;
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
    public config: any;
    public params: any;

    constructor(private messageService: MessageService, private _rolesService: RolService,
                private _validadorService: ValidadorService,
                private _usuarioService: UsuarioService, private router: Router) {
        super(messageService);
    }

    ngOnInit() {
        this.loading = true;
        this.Usuario = {
            cuil: "",
        }

        this.collapseOptions = {
            hidden: false,
            disabled: false
        }
        this.items = [
            {label: 'Editar Usuario', icon: 'pi pi-pencil', command: (event) => this.editarRegistro()}
        ];

        this.disabledFields = ['cuil'];
        //var configCalendar = {}
        /***********configuro la tabla******************/
        this.config = {
            /*****registro por pagina *************/
            rowsPerPage: 10,
            allowGlobalSearch: false,
            allowServerSide: true
        }
        this.camposUsuario = [
            {
                header: "Apellido",
                field: 'apellido',
                classPadre: "ui-g-4",
                class: "ui-g-12",
                size: 20
            },
            {
                header: "Nombre",
                field: 'nombre',
                classPadre: "ui-g-4",
                class: "ui-g-12",
                size: 20
            },
            {
                header: "Correo",
                field: 'email',
                classPadre: "ui-g-6",
                class: "ui-g-12",
                size: 40
            }


        ]
        this.cols = [

            {header: "Id", field: 'id', input: "input", required: false, type: "nomber", disabled: false},
            {
                header: "Nombre",
                field: 'nombre',
                classPadre: "ui-g-12",
                class: "ui-g-12",
                input: "input",
                allowFiltered: true,
                required: true,
                pattern: '^[a-zA-Z áéíóúÑñ]{3,80}$',
                type: "string",
                disabled: false
            },
            {
                header: "Apellido",
                field: 'apellido',
                input: "input",
                classPadre: "ui-g-6",
                class: "ui-g-12",
                allowFiltered: true,
                required: true,
                pattern: '^[a-zA-Z áéíóúÑñ]{3,80}$',
                type: "string",
                disabled: false
            },
            {
                header: "Correo",
                field: 'correo',
                classPadre: "ui-g-4",
                class: "ui-g-12",
                input: "input",
                required: false,
                allowFiltered: true,
                pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
                type: "string",
                disabled: false
            },
            {
                header: "Cuil",
                field: 'cuil',
                classPadre: "ui-g-4",
                class: "ui-g-12",
                input: "input",
                required: true,
                allowFiltered: true,
                //pattern: '^[a-zA-Z áéíóúÑñ]{5,20}$',
                type: "string",
                disabled: false
            },
            {
                header: "Bloqueado",
                field: 'bloqueado',
                classPadre: "ui-g-4",
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
                icon: "pi pi-close",
                label: "Guardar",
                disabled: false,
                execute: this.save.bind(this)
            }
        ];
        this.actionButtons = [
            {
                class: "",
                icon: "pi pi-plus",
                label: "Agregar",
                disabled: false,
                execute: this.showDialogToAdd.bind(this)
            },

        ];
        this.loading = false;
    }
    Consulta(params) {
        this._usuarioService.getAllUsuariosUsingGET(params)
            .subscribe(resp => {
                    if (!resp) {
                        this.showError("error en el servidor")
                    } else {
                        this.usuarios = resp['body']['content'];
                        this.page = resp['body'].page;
                        this.config.totalRecords = resp['body'].page.total_elements;
                    }
                },
                error => {
                    this.errorMessage = <any>error;
                    this.Log("error consulta ---->", this.errorMessage);
                    this.showError("Error Servidor Fuera de Servicio", this.errorMessage.message)
                    if (this.errorMessage.error && this.errorMessage.error['body'] != "undefined" && this.errorMessage.error['body'] != "") {
                        this.showError("error ", this.errorMessage.error)
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
            if (event.sortOrder == 1) {
                orden = "asc";
            } else {
                orden = "desc";
            }
            sort = event.sortField + "," + orden;
        }
        else
        {
            sort="id,asc";
        }
        const params = {
            sort: sort,
            size: event.rows,
            page: page
        }
        this.params = params;
        var index;
        for (index in event.filters) {
            params[index] = event.filters[index].value;
        }
        this.Consulta(params);

    }

    setEstadoCampos(estado) {
        if (estado == true) {
            estado = false;
        } else {
            estado = true;
        }
        this.disabledFields.forEach(campo => {
            var index;
            for (index in this.columnas) {
                if (this.columnas[index].field == campo) {
                    this.columnas[index].disabled = estado;
                }

            }
        });
    }

    borrarUsuario() {
        if (this.id && this.id > 0) {
            this._usuarioService.BorrarUnUsuario(this.id).subscribe(
                response => {
                    if (!response) {
                        this.showError("error en el servidor")
                    } else {
                        if (response['body'] && response['body'] == true) {
                            this.refresh();
                        } else {
                            this.showError("error ", "debe estar pendiende para poder borrarse")
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
    onHide() {
        this.displayData=false;
        this.Usuario = [];
    }
    buscarCuil() {
        this._usuarioService.getUsuarioADUsingGET(this.Usuario.cuil.replace(/-/g, ''))
            .subscribe(resp => {
                    if (!resp) {

                        this.showError("error en el servidor")
                    } else {
                        var Usuario = resp['body']
                        if (Usuario && Usuario != null) {
                            this.Usuario = Usuario;
                            this.Usuario.cuil = this.Usuario.numero_cui;
                            this.displayData=true
                        } else {
                            this.showError("El cuil='" + this.Usuario.cuil + "' No se encuentra en la base de datos de cuentas de correo")
                            this.Usuario = [];

                        }
                        if (this.totalRecords < 1) {
                        }
                    }
                },
                error => {

                    this.errorMessage = <any>error;
                    this.Log("error busqueda ---->", this.errorMessage);
                    this.showError("Error Servidor Fuera de Servicio", this.errorMessage.message)
                    if (this.errorMessage.error && this.errorMessage.error['body'] != "undefined" && this.errorMessage.error['body'] != "") {
                        this.showError("error ", this.errorMessage.error)
                    }

                });

    }

    showDialogToAdd() {
        this.errors = [];
        this.newUsuario = true;
        this.tituloDialog = "Alta Usuario";
        this.displayDialogAlta = true;
    }

    getTF() {
        const tf = [
            {value: 1, label: "SI"},
            {value: 0, label: "NO"},
        ]
        return tf
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

    altaUsuarioAd() {

        this._usuarioService.AltaDeUsuarioAD(this.Usuario.cuil).subscribe(
            response => {
                this.result = response;
                if (!this.result) {

                    this.showError("error en el servidor")
                } else {
                    this.displayDialogAlta = false;
                    this.Usuario = [];
                    this.Usuario.cuil;
                    this.showSuccess("Alta dada ok")
                    this.refresh();

                    if (this.result && !!this.result['body'] && this.result['body'].id) {

                    }
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.Log("error alta ---->", this.errorMessage);
                this.errorManagement(this.errorMessage, "error alta ---->")
            }
        );
    }


    /********** Funcion  cuando selecciona una fila  ******/
    onRowSelect(event) {
    }

    onRowMenuSelect(event) {
        this.registro = event.data;
        this.id = event.data.id;

    }

    editarRegistro() {
        this.errors = [];
        /******habilito todos los campos para la modificacion ******/
        this.setEstadoCampos(false);
        this.newUsuario = false;
        /*******bajos los estados disponibles para un id de ussario*******/
        this.usuario = this.cloneEvaluacion(this.selectedRegistro);
        this.tituloDialog = "Editar Usuario " + this.selectedRegistro.nombre + " " + this.selectedRegistro.apellido;
        this.displayDialog = true;
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
        let usuario = {};
        for (let prop in c) {
            usuario[prop] = c[prop];
        }
        return usuario;
    }


    convertToString(estado) {
        if (typeof estado === "object") {
            return estado.value;
        }
        return estado;
    }

    guardaUsuario(Usuario) {

        const params = {
            usuarioEditDto: Usuario,
            id: Usuario.id
        }

        this._usuarioService.EditarUsuario(params).subscribe(
            response => {

                this.result = response;
                if (!this.result) {
                    alert('error en el servidor');
                } else {
                    if (this.result && !!this.result['body'] && this.result['body'].id) {
                        this.Usuario = [];
                        this.displayDialog = false;
                        this.showSuccess("Registro " + this.result['body'].nombre + " modificado ok")
                        this.refresh();
                    }
                }
            },
            error => {
                this.errorMessage = <any>error;
                this.Log("error ", this.errorMessage);
                if (this.errorMessage.error && this.errorMessage.error['body'] && this.errorMessage.status) {
                    var resp = this.errorMessage.error['body'];

                    if (typeof resp === "string") {
                        this.messageService.add({
                            life: 3000,
                            id: "general",
                            severity: 'error',
                            summary: "Error de Guardado",
                            detail: resp
                        });
                    } else {
                        this.errors = this.errorMessage.error['body'];
                    }
                    this.Log("error modificacion ---->", this.errors);

                }
            }
        );

    }


    save(usuario) {
        if (this._validadorService.validarCampos(usuario, this.columnas) == true) {
            if (this.newUsuario == false) {
                this.guardaUsuario(usuario);
            }
            this.refresh();
        } else {
            this.errorsForm = this._validadorService.getErrorForm();
            this.showError("Error en la carga de datos ", "")
        }

    }

    refresh() {
        this.Consulta(this.params);
    }

    onRowExpand(event) {
        this.getRoles();
        this.expandedUser = event.data;
        this.rolesAsignados = event.data.roles;

    }

    addRol(event: any) {
        event.items.forEach(rol => {
            var params = {
                idRol: rol.id,
                id: this.expandedUser.id
            }

            this._usuarioService.addRol(params)
                .subscribe(resp => {
                        if (!resp) {

                            this.showError("error en el servidor")
                        } else {
                            this.rolesAsignados = resp['body'].roles

                        }
                    },
                    error => {
                        this.errorMessage = <any>error;
                        this.Log("error consulta  coles---->", this.errorMessage);
                        this.showError("Error Servidor Fuera de Servicio", this.errorMessage.message)
                        if (this.errorMessage.error && this.errorMessage.error['body'] != "undefined" && this.errorMessage.error['body'] != "") {
                            this.showError("error ", this.errorMessage.error)
                        }

                    });

        })
    }

    delRol(event: any) {
        event.items.forEach(rol => {
            var params = {
                idRol: rol.id,
                id: this.expandedUser.id
            }

            this._usuarioService.delRol(params)
                .subscribe(resp => {
                        if (!resp) {

                            this.showError("error en el servidor")
                        } else {
                            this.rolesAsignados = resp['body'].roles

                        }
                    },
                    error => {
                        this.errorMessage = <any>error;
                        this.Log("error consulta  coles---->", this.errorMessage);
                        this.showError("Error Servidor Fuera de Servicio", this.errorMessage.message)
                        if (this.errorMessage.error && this.errorMessage.error['body'] != "undefined" && this.errorMessage.error['body'] != "") {
                            this.showError("error ", this.errorMessage.error)
                        }

                    });

        })
    }

    getRoles() {
        const params = {
            sort: "",
            size: 0,
            page: 0

        }
        this.roles = []
        this.rolesAsignados = []
        var roles = []
        this._rolesService.getAllRolesUsingGET(params)
            .subscribe(resp => {
                    if (!resp) {
                        this.showError("error en el servidor")
                    } else {

                        roles = resp['body']['content']

                        var enc = false;
                        roles.forEach(rol => {

                            if (this.expandedUser.roles.find(rolf => rolf.id == rol.id)) {

                            } else {
                                this.roles.push(rol);
                            }
                        })

                        if (this.totalRecords < 1) {
                        }
                    }
                },
                error => {

                    this.errorMessage = <any>error;
                    this.Log("error consulta  coles---->", this.errorMessage);
                    this.showError("Error Servidor Fuera de Servicio", this.errorMessage.message)
                    if (this.errorMessage.error && this.errorMessage.error['body'] != "undefined" && this.errorMessage.error['body'] != "") {
                        this.showError("error ", this.errorMessage.error)
                    }

                });
    }
}
