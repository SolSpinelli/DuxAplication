import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableFilterMetaData } from "primereact/datatable";
import { CSSProperties, useContext } from "react";
import './Table.styles.css'

type Filter = {
    [key: string]: DataTableFilterMetaData
}

interface Props {
    data: any[];
    columns: any[];
    pagination?: boolean;
    rows?: number;
    first?: number;
    rowsPerPage?: number[];
    totalRecords?: number;
    filters?: Filter
    sortField?:string;
    sortOrder?: undefined | null | 0 | 1 | -1;
    lazy?:boolean;
    tableClassName?:string;
    loading?:boolean;
    emptyMessage?: string;
    deleteData?: boolean;
    handleDelete?: (value: any) => void;
    customCell?: string;
    columnStyle?: CSSProperties;
    handleRowClick?: (value: any) => void;
    onPage?: (value: any) => void;
    onSort?: (value: any) => void;
}

export default function Table(props: Props) {
    const {
        data,
        columns,
        pagination,
        rows,
        first,
        filters,
        rowsPerPage,
        totalRecords,
        sortField,
        sortOrder,
        lazy,
        tableClassName,
        loading,
        emptyMessage,
        deleteData,
        handleDelete,
        customCell = "usuario",
        columnStyle,
        handleRowClick,
        onPage,
        onSort
    } = props;

    const trashIconColumn = (rowData: any) => {
        return (
            <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger p-button-text"
                onClick={() => handleDelete ? handleDelete(rowData): ""}
                tooltip="Eliminar usuario" 
            />
        );
    };

    const bodyTemplate = (rowData: any) => {
        return (

                <span 
                    className="custom-column" 
                    onClick={() => handleRowClick ? handleRowClick(rowData) : ""}
                >
                    {rowData[customCell]}
                </span>
        );
    }

    return (
        <DataTable 
                value={data} 
                paginator={pagination} 
                rows={rows} 
                rowsPerPageOptions={rowsPerPage}
                first={first}
                totalRecords={totalRecords}
                onPage={onPage}
                filters={filters}
                lazy={lazy}
                tableClassName={tableClassName}
                onSort={onSort} 
                sortField={sortField} 
                sortOrder={sortOrder}
                loading={loading}
                emptyMessage={emptyMessage}
            >
                {columns.map((col) => (
                    <Column
                        key={col.field}
                        field={col.field}
                        header={col.header}
                        sortable
                        style={columnStyle}
                        body={col.field === customCell ? bodyTemplate : undefined}
                    />
                ))}
                {deleteData && <Column body={trashIconColumn} header={""}/>}
            </DataTable>
    )
}