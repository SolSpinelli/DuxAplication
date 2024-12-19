

export const showMessage = (msg: any, severity: any, summary: string, label: string) => {
    if (msg.current) {
        msg.current.show({ severity: severity, summary: summary, detail: label, life: 3000, closable: true });
    }
};

export const handleSuccess = (msg: any, mensaje: any) => {
    showMessage(msg, "success", "Cambios guardados", mensaje)
}

export const handleError = (msg: any, error: any) => {
    showMessage(msg, "error", "Error", error)
}