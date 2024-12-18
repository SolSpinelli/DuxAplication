import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

import { InputText } from 'primereact/inputtext';

interface InputProps {
    placeholder: string,
    showIcon?:boolean,
    icon?: string,
    value: any,
    onChange: (event:any) => void,
    size?: string | number,
    classname?: string
}


export const InputComponent = (props: InputProps) => {
    const { placeholder, showIcon, icon, value, onChange, size, classname } = props

    return(
        showIcon ? 
            <IconField iconPosition='left'>
                {showIcon && <InputIcon className={icon}> </InputIcon>}
                <InputText v-model="value1" placeholder={placeholder} onChange={onChange} value={value} size={size} className={classname}/>
            </IconField>
        :
            <InputText v-model="value1" placeholder={placeholder} onChange={onChange} value={value} size={size} className={classname}/>
        
        
    )
}