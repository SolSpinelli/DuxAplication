'use client'
import { Dialog } from 'primereact/dialog';
import { InputIcon } from 'primereact/inputicon';
import { Button } from 'primereact/button';
import './User.styles.css'
import {  useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { UsuarioService } from '@/app/lib/service/UsuariosService';
import { handleError } from '@/app/lib/Utils';
import { ModalComponent } from '@/app/ui/modal/ModalComponent';
import { Header } from '@/app/ui/header/Header';
import { InputComponent } from '@/app/ui/input/Input';
import { DropdownComponent } from '@/app/ui/input/Dropdown';
import { estados, sectores } from '@/app/lib/Data';

interface Props {
    visible: boolean;
    setSaved: (value: boolean) => void;
    usuario: any;
    onHide: () => void;
}

export default function User (props: Props) {
    const { visible, setSaved, usuario, onHide} = props;

    const msg = useRef<Toast | null>(null);

    const initialState = {
        id: "",
        usuario: "",
        sector: "",
        estado: ""
    }

    const [user, setUser] = useState(initialState);

    const clear = (saved:boolean) => {
        setUser(initialState);
        setSaved(saved)
        onHide();
        
    }

    const checkField = (value: string | number) => {
        return (value !== "" && value !== null && value !== undefined) 
    }

    const handleResponse = (response: any, mensaje: string) => {
        if (!response.ok) 
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        clear(true);
    }

    const post = (usuario: any) => {
        UsuarioService.insertUsuario(usuario)
        .then((response) => {
            handleResponse(response, "Usuario insertado correctamente.");
          })
        .catch((error) => handleError(msg, error));
    }

    const update = (usuario: any) => {
        UsuarioService.updateUsuario(usuario)
        .then((response) => {
            handleResponse(response, "Usuario actualizado correctamente");
          })
        .catch((error) => handleError(msg, error));

    }

    const handleSave = () => {
        if (checkField(user.id) && checkField(user.usuario) && checkField(user.estado) && checkField(user.sector)){
            console.log(user)
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
                        onClick={() => clear(false)} 
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
            onHide={() => clear(false)} 
            header={header} 
            headerStyle={{
                padding: "0px"
            }} 
            modal 
            closable={false} 
            className='modal'
            draggable={false}>
                <ModalComponent
                    title='id'
                    children={
                        <InputComponent
                            placeholder='Ingrese el id del Usuario' 
                            value={user.id}
                            onChange={(event) => setUser({...user, id:event.target.value})}
                            classname="w-full md:w-48rem"
                        />
                    }
                />

                <ModalComponent 
                    title="Nombre:" 
                    children= {
                        <InputComponent 
                            placeholder='Ingrese el nombre del Usuario' 
                            value={user.usuario}
                            onChange={(event) => setUser({...user, usuario:event.target.value})}
                            classname="w-full md:w-48rem"
                        />
                    }
                />

                <ModalComponent 
                    title="Estado:" 
                    children = {
                        <DropdownComponent
                            showIcon
                            placeholder='Seleccione el estado' 
                            value={user.estado} 
                            options={estados}
                            classname="w-full md:w-48rem"
                            icon="pi pi-search"
                            onChange={(event) => setUser({...user, estado:event.target.value})}
                        />
                    }
                />

                <ModalComponent 
                    title="Sector:" 
                    children = {
                        <DropdownComponent 
                            showIcon
                            placeholder='Seleccione el Sector' 
                            value={user.sector} 
                            options={sectores}
                            onChange={(event) => setUser({...user, sector:event.target.value})}
                            classname="w-full md:w-48rem"
                            icon="pi pi-search"
                        />
                    }
                />

            <div className="buttons">
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
                    onClick={()=> clear(false)}
                />
            </div>
            <Toast ref={msg} position='bottom-center'/>

        </Dialog>
    )
}