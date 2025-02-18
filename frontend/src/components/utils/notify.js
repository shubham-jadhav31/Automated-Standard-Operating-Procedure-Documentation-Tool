import { toast, Bounce } from "react-toastify";
import "./../../../public/css/customToast.css";

const notify = (msg, type) => {
    if (type === "info") {
        toast.info(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            className: "custom-toast",
            bodyClassName: "custom-toast-body"
        });
    } else if (type === "success") {
        toast.success(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            className: "custom-toast",
            bodyClassName: "custom-toast-body"
        });
    } else if (type === "error") {
        toast.error(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            className: "custom-toast",
            bodyClassName: "custom-toast-body"
        });
    } else if (type === "warning") {
        toast.warning(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            className: "custom-toast",
            bodyClassName: "custom-toast-body"
        });
    } else {
        // Default to an info toast if type is not recognized
        toast.info(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            className: "custom-toast",
            bodyClassName: "custom-toast-body"
        });
    }
};

export default notify;
