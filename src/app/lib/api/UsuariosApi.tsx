import { UsuarioService } from "../service/UsuariosService"

export const UsuariosApi = {
    async getListado(tableState: any) {
        try {
            const response = await UsuarioService.getUsuarios(tableState);
            const total = Number(response.headers?.get('X-Total-Count'));
            const data = await response.json();
            return { data, total };
        } catch (error) {
            console.error("Error al obtener el listado de usuarios:", error);
            return null;
        }
    },
}