import {toast} from "react-toastify";

const settings = {
    position: 'bottom-right',
    autoClose: true,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
};

export function notifyError(message){
    createMessage(message, 'error');
}

export function notifySuccess(message){
    createMessage(message, 'success');
}

export function createMessage(message, type = 'success'){

    switch(type){
        case 'success':
            toast.success(message, settings);
            break;
        case 'error':
            toast.error(message, settings);
            break;
        default:
            toast.info(message, settings);
            break;
    }

}


