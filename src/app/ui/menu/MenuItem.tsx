import Link from "next/link";
import { IconField } from "primereact/iconfield";
import { Tooltip } from "primereact/tooltip";
import "./Menu.styles.css"

interface Props {
    id: string;
    ref?: string;
    label?: string;
    icon?: string;
    tooltip?: string;
}
  
export default function MenuItem(props: Props) {
    const {id, ref, label, icon, tooltip} = props;


    return (
    <>
        <Link
            key={id}
            id={id}
            href={ref ?? ""}
            className="menuItem"
        >
            <div style={{ display: "flex", gap:"7px"}}> 
                <IconField className={icon} />
                {label}
            </div>
        </Link>
        
        <Tooltip target={`#${id}`} content={tooltip} />

    </>
);
}