import { DropdownComponent } from "@/app/ui/input/Dropdown"
import { InputComponent } from "@/app/ui/input/Input"
import { Button } from "primereact/button"
import { useContext } from "react"
import { FilterMatchMode } from "primereact/api"
import { estados, sectores } from "@/app/lib/Data"
import { TableStateContext } from "./UsuariosSection"

export default function FilterSection() {

    const {tableState, setTableState} = useContext(TableStateContext);


    return (
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
    )

}