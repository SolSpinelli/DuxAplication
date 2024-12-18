'use client'
import "./page.styles.css"
import { Card } from 'primereact/card'
import { Button } from 'primereact/button';
import { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { FilterMatchMode } from 'primereact/api';
import { InputComponent } from '../../ui/input/Input';
import { DropdownComponent } from '../../ui/input/Dropdown';
import { SECTOR, estados, sectores, usuarioColumns } from '../../lib/Data';
import User from "./user/page";
import { UsuarioService } from "@/app/lib/service/UsuariosService";


export const showMessage = (msg: any, severity: any, summary: string, label: string) => {
    if (msg.current) {
        msg.current.show({ severity: severity, summary: summary, detail: label, life: 3000, closable: true });
    }
};

export default function Page() {

    const [visibleModal, setVisibleModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(true);
    const msg = useRef<Toast | null>(null);
    const [saved, setSaved] = useState(false);
    const [totalRows, setTotalRows] = useState(1);
    const [tableState, setTableState] = useState({
        first: 0,
        rows: 5,
        page: 0,
        sortField: undefined,
        sortOrder: null,
        filters: {
            usuario: { value: null, matchMode: FilterMatchMode.CONTAINS },
            estado: { value: null, matchMode: FilterMatchMode.EQUALS},
            sector: {value: SECTOR, matchMode: FilterMatchMode.EQUALS}
        }
    });

    const header = () => {
        return (
            <div className='header-container'>
                <h1 className='title'> Usuarios </h1>
                <Button 
                        label='Nuevo usuario' 
                        icon="pi pi-plus" 
                        className='button'
                        onClick={() => setVisibleModal(true)}
                    />
            </div>

        )
    }

    const trashIconColumn = (rowData: any) => {
        return (
            <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger p-button-text"
                onClick={() => handleDelete(rowData)}
                tooltip="Eliminar usuario" 
            />
        );
    };

    const nameBodyTemplate = (rowData: any) => {
        return (
            <span 
                className="name-column" 
                onClick={() => handleRowClick(rowData)}
            >
                {rowData.usuario}
            </span>
        );
    }

    const handleError = (error: any) => {
        showMessage(msg, "error", "Error", error)
    }

    const handleSuccess = (mensaje: any) => {
        showMessage(msg, "success", "Cambios guardados", mensaje)
    }

    const getUsers = () => {
        UsuarioService.getUsuarios(tableState)
        .then((data) => {
            setTotalRows(Number(data.headers?.get('X-Total-Count')));
            data.json()
            .then((res) => setData(res))
        }).catch((error) => {
            setData([]);
            handleError("No se pudieron cargar los datos: " + error);
        })
        .finally(() => setLoading(false))     
    }

    const handleDelete = (user: any) => {
        UsuarioService.deleteUsuario(user)
        .then(() => {
            handleSuccess("Usuario eliminado correctamente.");
            getUsers();
        })
        .catch(error => handleError("No se pudo eliminar el usuario: " + error));

    }

    const handleRowClick = (user: any) => {
        setSelectedUser(user);
        setVisibleModal(true);
    }

    const onPage = (event: any) => {
        setTableState(event);
    };

    const onSort = (event: any) => {
        setTableState({
            ...tableState,
            sortField: event.sortField,
            sortOrder: event.sortOrder
        })
    };

    const onHideModal = () => {
        setVisibleModal(false);
        setSelectedUser(null);
    }

    useEffect(() => {
        getUsers()
    }, [tableState])


    useEffect(() => {
        if (saved) {
            setSaved(false);
            handleSuccess("Cambios guardados exitosamente.");
            getUsers()
        }

    }, [saved])

    return (
        <Card header={header} className="card">
            <div className="filter">
                <div className='input-row'>
                <InputComponent 
                    showIcon
                    placeholder="Buscar" 
                    icon="pi pi-search" 
                    onChange ={(event: any) => {
                        setTableState({
                            ...tableState,
                            filters: {
                                ...tableState.filters,
                                usuario: {
                                    value: event.target.value,
                                    matchMode: FilterMatchMode.CONTAINS
                                }
                                
                            }
                        })
                    }}
                    value={tableState.filters.usuario.value ?? ""}
                    classname="w-full md:w-22rem"
                />
                <DropdownComponent 
                    showIcon
                    placeholder="Seleccionar el Estado" 
                    icon="pi pi-search" 
                    value={tableState.filters.estado.value} 
                    options={estados}
                    onChange={(event) => {
                        setTableState({
                            ...tableState,
                            filters: {
                                ...tableState.filters,
                                estado: {
                                    value: event.target.value,
                                    matchMode: FilterMatchMode.EQUALS
                                }
                                
                            }
                        })
                    }}
                    classname="w-full md:w-22rem"

                />
                <DropdownComponent 
                    showIcon
                    placeholder="Seleccionar el Sector" 
                    icon="pi pi-search" 
                    value={tableState.filters.sector.value} 
                    options={sectores}
                    onChange={(event) => {
                        setTableState({
                            ...tableState,
                            filters: {
                                ...tableState.filters,
                                sector: {
                                    value: event.target.value,
                                    matchMode: FilterMatchMode.EQUALS
                                }
                                
                            }
                        })
                    }}
                    classname="w-full md:w-22rem"
                />
                </div>
                <div className='button-row'>
                <Button 
                    icon="pi pi-filter" 
                    severity='secondary'
                    size='small'
                    className='button-filter'
                    onClick={() => setTableState({
                        ...tableState,
                        filters: {
                            ...tableState.filters,
                            usuario: {
                                value: null,
                                matchMode: FilterMatchMode.CONTAINS
                            },
                            estado: {
                                value: null,
                                matchMode: FilterMatchMode.EQUALS
                            }
                            
                        }
                    })}
                />
                <Button 
                    icon="pi pi-sliders-v" 
                    severity='secondary'
                    size='small'
                    className='button-filter'
                    onClick={() => setTableState({
                        ...tableState,
                        sortField: undefined,
                        sortOrder: null,
                    })}
                />
                </div>
            </div>
            
            <DataTable 
                value={data} 
                paginator 
                rows={tableState.rows} 
                rowsPerPageOptions={[5, 10, 15, 25]}
                totalRecords={totalRows}
                onPage={onPage}
                filters={tableState.filters}
                lazy
                first={tableState.first}
                tableClassName='table'
                onSort={onSort} 
                sortField={tableState.sortField} 
                sortOrder={tableState.sortOrder}
                loading={loading}
                emptyMessage={"No se encontraron resultados"}
            >
                {usuarioColumns.map((col) => (
                    <Column
                        key={col.field}
                        field={col.field}
                        header={col.header}
                        sortable
                        body={col.field === "usuario" ? nameBodyTemplate : undefined}
                    />
                ))}
                <Column body={trashIconColumn} header={""}/>
            </DataTable>

            <Toast ref={msg} position='bottom-center'/>

            <User visible={visibleModal} onHide={onHideModal} usuario={selectedUser} setSaved={setSaved}/>
        </Card>

    )
}