
import "./page.styles.css"
import { Card } from 'primereact/card'
import { Suspense, lazy } from 'react';
import { TableSkeleton } from "@/app/ui/table/TableSkeleton";

const UsuariosSection = lazy(() => import('./UsuariosSection'));

export default async function Page() {

    return (
            <Card className="card">
                <Suspense fallback={<TableSkeleton />}>
                    <UsuariosSection />
                </Suspense>
            </Card>
        

    )
}