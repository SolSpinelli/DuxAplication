import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { InputIcon } from 'primereact/inputicon';
import { Button } from 'primereact/button';
import './User.styles.css'
import { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { showMessage } from '../page';
import { Header } from '../../../ui/header/Header';
import { InputComponent } from '../../../ui/input/Input';
import { DropdownComponent } from '../../../ui/input/Dropdown';
import { estados, sectores } from '../../../lib/Data';
import { UsuarioService } from '@/app/lib/service/UsuariosService';

interface UserProps {
    visible: boolean,
    usuario: any,
    onHide: () => void,
    setSaved: any
}

export default function User (props: UserProps) {
    const {visible, usuario, onHide, setSaved } = props;

    const msg = useRef<Toast | null>(null);

    const initialState = {
        id: "",
        usuario: "",
        sector: "",
        estado: ""
    }

    const [user, setUser] = useState(initialState);

    const clear = () => {
        setUser(initialState);
        onHide();
    }

    const checkField = (value: string | number) => {
        return (value !== "" && value !== null && value !== undefined) 
    }

    const handleResponse = (response: any) => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        setSaved(true);
        clear();
    }

    const handleError = (error: any) => {
        showMessage(msg, "error", "Error", "Error al guardar:" + error)
    }

    const post = (usuario: any) => {
        UsuarioService.insertUsuario(usuario)
        .then((response) => {
            handleResponse(response);
          })
        .catch((error) => handleError(error));
    }

    const update = (usuario: any) => {
        UsuarioService.updateUsuario(usuario)
        .then((response) => {
            handleResponse(response);
          })
        .catch((error) => handleError(error));

    }

    const handleSave = () => {
        if (checkField(user.id) && checkField(user.usuario) && checkField(user.estado) && checkField(user.sector)){
            if (usuario){
                update(user);
            } else {
                post(user);
            }
        }
    }

    const header = () => {
        return (
            <Header 
                title='Usuario' 
                titleStyles= {{ fontSize: "20px"}}
                actions={[
                    <InputIcon 
                        className="pi pi-cog icon" 
                        style={{ cursor: "pointer"}}
                    />,
                    <InputIcon 
                        className="pi pi-minus icon" 
                        onClick={clear} 
                        style={{ cursor: "pointer"}}
                    />
                ]}
                style={{ 
                    borderRadius: "6px 6px 0px 0px",
                    padding: "0 17.5px"
                }}
            />
        )
    }

    useEffect(() => {
        if (usuario){
            setUser(usuario);
        }

    },[usuario])

    return (
        <Dialog 
            visible={visible} 
            onHide={onHide} 
            header={header} 
            headerStyle={{
                padding: "0px"
            }} 
            modal 
            closable={false} 
            className='modal'
            draggable={false}>
            <Card title="id" className="card-modal">
                <InputComponent
                    placeholder='Ingrese el id del Usuario' 
                    value={user.id}
                    onChange={(event) => setUser({...user, id:event.target.value})}
                    classname="w-full md:w-48rem"
                />
            </Card>

            <Card title="Nombre:" className="card-modal">
                <InputComponent 
                    placeholder='Ingrese el nombre del Usuario' 
                    value={user.usuario}
                    onChange={(event) => setUser({...user, usuario:event.target.value})}
                    classname="w-full md:w-48rem"
                    
                />
            </Card>

            <Card title="Estado:" className="card-modal">
                <DropdownComponent
                    showIcon
                    placeholder='Seleccione el estado' 
                    value={user.estado} 
                    options={estados}
                    classname="w-full md:w-48rem"
                    icon="pi pi-search"
                    onChange={(event) => setUser({...user, estado:event.target.value})}
                />
            </Card>

            <Card title="Sector:" className="card-modal">
                <DropdownComponent 
                    showIcon
                    placeholder='Seleccione el Sector' 
                    value={user.sector} 
                    options={sectores}
                    onChange={(event) => setUser({...user, sector:event.target.value})}
                    classname="w-full md:w-48rem"
                    icon="pi pi-search"
                />
            </Card>

            <div style={{ display: "flex", justifyContent: 'center',  gap: "10px"}}>
                <Button 
                    label='Confirmar' 
                    icon="pi pi-check" 
                    raised 
                    style={{ backgroundColor: "#2563EB"}} 
                    disabled={user.id === "" || user.usuario === "" || user.sector === "" || user.estado === ""}
                    onClick={handleSave}
                />
                <Button 
                    label='Cancelar' 
                    outlined 
                    icon="pi pi-check" 
                    style={{ color: "#3B82F6"}} 
                    onClick={clear}
                />
            </div>
            <Toast ref={msg} position='bottom-center'/>

        </Dialog>
    )
}