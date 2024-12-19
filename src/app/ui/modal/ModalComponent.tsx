import { Card } from "primereact/card";
import { ReactNode } from "react";

interface Props {
    title: string;
    children: ReactNode
}
export const ModalComponent = (props: Props) => {
    const {title, children} = props; 

    return (
        <Card 
            title={title} 
            className="card-modal">
                {children}
        </Card>
    )

}