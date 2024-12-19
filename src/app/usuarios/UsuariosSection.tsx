'use client'
import { SECTOR,usuarioColumns } from "@/app/lib/Data";
import { handleError, handleSuccess, showMessage } from "@/app/lib/Utils";
import { UsuarioService } from "@/app/lib/service/UsuariosService";
import Table from "@/app/ui/table/Table";
import { FilterMatchMode } from "primereact/api";
import { Toast } from "primereact/toast";
import {  createContext, useEffect, useRef, useState } from "react";
import FilterSection from "./FilterSection";
import HeaderSection from "./HeaderSection";
import User from "./user/page";
import { TableSkeleton } from "@/app/ui/table/TableSkeleton";


type TableStateContext = {
    tableState: {
        first: number;
        rows: number;
        page: number;
        sortField: string | undefined;
        sortOrder: undefined | null | 0 | 1 | -1;
        filters: {
            usuario: { value: string, matchMode: FilterMatchMode },
            estado: { value: string, matchMode: FilterMatchMode},
            sector: {value: number, matchMode: FilterMatchMode}
        }
    };
    setTableState: (value: any) => void;
};

const initTableContext = {
    tableState:{
        first: 0,
        rows: 5,
        page: 0,
        sortField: undefined,
        sortOrder: null,
        filters: {
            usuario: { value: "", matchMode: FilterMatchMode.CONTAINS },
            estado: { value: "", matchMode: FilterMatchMode.EQUALS},
            sector: {value: SECTOR, matchMode: FilterMatchMode.EQUALS}
        }
    },
    setTableState: () => {}
}

export const TableStateContext = createContext<TableStateContext>(initTableContext);

export default function DataSection() {
    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const msg = useRef<Toast | null>(null);
    const [totalRows, setTotalRows] = useState(1);
    const [tableState, setTableState] = useState({
        first: 0,
        rows: 5,
        page: 0,
        sortField: undefined,
        sortOrder: null,
        filters: {
            usuario: { value: "", matchMode: FilterMatchMode.CONTAINS },
            estado: { value: "", matchMode: FilterMatchMode.EQUALS},
            sector: {value: SECTOR, matchMode: FilterMatchMode.EQUALS}
        }
    });

    const getUsers = () => {
        UsuarioService.getUsuarios(tableState)
        .then((data) => {
            setTotalRows(Number(data.headers?.get('X-Total-Count')));
            data.json()
            .then((res) => setData(res))
        }).catch((error) => {
            setData([]);
            handleError(msg, "No se pudieron cargar los datos: " + error);
        })
        .finally(() => setLoading(false))     
    }

    const handleDelete = (user: any) => {
        UsuarioService.deleteUsuario(user)
        .then(() => {
            handleSuccess(msg, "Usuario eliminado correctamente.");
            getUsers();
        })
        .catch(error => handleError(msg, "No se pudo eliminar el usuario: " + error));

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

    const handleClickNuevoUsuario = () => {
        setVisibleModal(true);
    }

    const handleRowClick = (user: any) => {
        setSelectedUser(user);
        setVisibleModal(true);
    }

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
            handleSuccess(msg, "Cambios guardados exitosamente.");
            getUsers();
        }

    }, [saved])

    return (
        
        <>

        <HeaderSection
            title="Usuarios"
            button
            buttonCaption="Nuevo Usuario"
            onClick={handleClickNuevoUsuario}
        />

        <TableStateContext.Provider value={{ tableState, setTableState}} >

                <FilterSection />
                
                {data != null && data.length > 0  
                ?
                    <Table 
                        data={data} 
                        columns={usuarioColumns}
                        rows={tableState.rows}
                        first={tableState.first}
                        sortField={tableState.sortField}
                        sortOrder={tableState.sortOrder}
                        filters={tableState.filters}
                        onPage={onPage}
                        onSort={onSort}
                        pagination 
                        rowsPerPage={[5, 10, 15, 25]}
                        totalRecords={totalRows}
                        lazy
                        tableClassName='table'
                        loading={loading}
                        emptyMessage={"No se encontraron resultados"}
                        deleteData
                        handleDelete={handleDelete}
                        customCell={"usuario"}
                        columnStyle={{width: "20%"}}
                        handleRowClick={handleRowClick}
                    /> 
                :
                    <TableSkeleton />
                }
                
                <User visible={visibleModal} setSaved={setSaved} usuario={selectedUser} onHide={onHideModal}/>
                <Toast ref={msg} position='bottom-center'/>
        </TableStateContext.Provider>
        </>

    )

}