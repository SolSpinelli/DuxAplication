import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dropdown } from 'primereact/dropdown';


interface DropdownProps {
    placeholder: string,
    showIcon?:boolean
    icon?: string,
    value: any,
    options: any[],
    onChange: (event:any) => void,
    classname?: string,

}

export const DropdownComponent = (props: DropdownProps) => {
    const { placeholder, showIcon, icon, value, options, onChange, classname } = props

    return(
        showIcon ? 
            <IconField iconPosition='left'>
                <Dropdown placeholder={placeholder} value={value} options={options} onChange={onChange} className={classname} style={{paddingLeft: "2rem"}}/>
                <InputIcon className={icon}> </InputIcon>
            </IconField>
        :
            <Dropdown placeholder={placeholder} value={value} options={options} onChange={onChange} className={classname}/>
    )
}