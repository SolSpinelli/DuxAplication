import { usuarioColumns } from "@/app/lib/Data"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { Skeleton } from "primereact/skeleton"

export const TableSkeleton = () => {
    const items = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        usuario: `Usuario ${i + 1}`,
        sector: `Sector ${i + 1}`,
        estado: `Estado ${i + 1}`,
        delete: ""
    }));

    return (
        <DataTable value={items} className="p-datatable-striped">
        {usuarioColumns.map((item) => 
            <Column key={item.field} field={item.field} header={item.header} style={{ width: '20%' }} body={<Skeleton />}></Column>
        )}
    </DataTable>
    )
    
}