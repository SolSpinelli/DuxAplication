import Link from "next/link";
import { IconField } from "primereact/iconfield";
import "./page.styles.css"
import { Button } from "primereact/button";

interface Props {
    title?: string;
    button?: boolean;
    buttonCaption?: string;
    onClick?: () => void;
}
export default function HeaderSection(props: Props) {
    const {title, button, buttonCaption, onClick} = props;

    return (
        <div className='header-container'>
            <h1 className='title'> {title} </h1>
            {button && 
                <Button 
                label={buttonCaption} 
                icon="pi pi-plus" 
                className='button'
                onClick={() => onClick ? onClick() : ""}
            />
            }
        </div>

    )

}