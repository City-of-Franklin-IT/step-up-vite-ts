import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from 'react-toastify';
import styles from './Toast.module.css';
// Icons
import authIcon from '../../assets/icons/auth/auth.svg';
import infoIcon from '../../assets/icons/info/info.svg';
import errorIcon from '../../assets/icons/error/error.svg';
export var errorPopup = function (msg) {
    var content = (_jsxs("div", { className: "".concat(styles.popup, " ").concat(styles.errorPopup), children: [_jsx("img", { src: errorIcon, alt: "error icon", className: styles.icon }), _jsx("div", { className: "text-center", children: msg || "Error" })] }));
    toast(content, {
        closeButton: false,
        autoClose: 5000,
        position: "bottom-center",
        theme: "transparent",
        closeOnClick: true
    });
};
export var authPopup = function () {
    var content = (_jsxs("div", { className: "".concat(styles.popup, " ").concat(styles.authPopup), children: [_jsx("img", { src: authIcon, alt: "auth icon", className: styles.icon }), _jsx("div", { className: "text-center", children: "Authenticated" })] }));
    toast(content, {
        closeButton: false,
        autoClose: 5000,
        position: "bottom-center",
        theme: "transparent",
        closeOnClick: true
    });
};
export var infoPopup = function (msg) {
    var content = (_jsxs("div", { className: "".concat(styles.popup, " ").concat(styles.infoPopup), children: [_jsx("img", { src: infoIcon, alt: "info icon", className: styles.icon }), _jsx("div", { className: "text-center", children: msg })] }));
    toast(content, {
        closeButton: false,
        autoClose: 5000,
        position: "bottom-center",
        theme: "transparent",
        closeOnClick: true
    });
};
