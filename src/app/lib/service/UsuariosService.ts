import { SECTOR } from "../Data";



export const UsuarioService = {
    getUsuarios(params: any) {
        const queryParams = new URLSearchParams();

        if (params.filters.usuario?.value) {
            queryParams.append('usuario_like', params.filters.usuario.value);
        }
        if (params.filters.estado?.value) {
            queryParams.append('estado', params.filters.estado.value);
        }
        queryParams.append('sector', SECTOR.toString());
        if (params.sortField) {
            queryParams.append('_sort', params.sortField);
        }
        if (params.sortOrder) {
            queryParams.append('_order', params.sortOrder === 1 ? "asc" : "desc");
        }
        queryParams.append("_limit", params.rows.toString())
        queryParams.append("_page", (params.page + 1).toString())
    
        return fetch(`https://staging.duxsoftware.com.ar/api/personal?${queryParams.toString()}`)
                .then((res) => res);

    },

    insertUsuario(usuario: any) {
        return fetch("https://staging.duxsoftware.com.ar/api/personal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
        })
    },

    updateUsuario(usuario: any) {
        return fetch(`https://staging.duxsoftware.com.ar/api/personal/${usuario.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
        })

    },

    deleteUsuario(usuario: any) {
        return fetch(`https://staging.duxsoftware.com.ar/api/personal/${usuario.id}`, {
            method: "DELETE"
        })
    }
}