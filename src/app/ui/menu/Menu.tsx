'use client'
import MenuItem from "./MenuItem";
import "./Menu.styles.css"
import { Tooltip } from "primereact/tooltip";

interface Props {
    items: {
        id: string;
        ref?: string;
        label?: string;
        icon?: string;
        tooltip?: string;
    }[]
}

export default function Menu(props: Props) {
    const {items} = props;

    return (
        <div className="menu">
            {items.map((item, index) => {
                return (
                        <MenuItem 
                            key={index} 
                            ref={item.ref}
                            id={item.id} 
                            icon="pi pi-box"
                            label={item.label}
                            tooltip={item.tooltip}
                        />
                )
            })}
        </div>
    )
}