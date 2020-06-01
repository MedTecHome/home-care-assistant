export const NAME_APP = 'HomeCare-View';
export const USERNAME_DOMAIN = '@homecareassistant.com';

/** text reducers actions */
export const SET_MODAL_VISIBLE = 'SET_MODAL_VISIBLE';

export const ADD_FORM_TEXT = 'ADD_FORM_TEXT';
export const EDIT_FORM_TEXT = 'EDIT_FORM_TEXT';
export const DELETE_FORM_TEXT = 'DELETE_FORM_TEXT';
export const DETAILS_FORM_TEXT = 'DETAILS_FORM_TEXT';

/** validator text */
export const REGEX_EMAIL_ADDRESS = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const REGEX_POSITIVE_NUMBER = /^\d*[1-9]\d*$/;
export const REGEX_POSITIVE_NUMBER_AND_DECIMAL = /^\d*\.?\d*$/;
export const REGEX_ALPHANUMERIC_AND_SPACE = /^[-\w\s]+$/;
export const REGEX_PHONE = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s.]{0,1}[0-9]{3}[-\s.]{0,1}[0-9]{4}$/;
export const REGEX_ONLY_ALPHA = /^[a-zA-Z\s]+$/;
export const REGEX_ONLY_ALPHANUMERIC = /^[a-zA-Z0-9]+$/;
export const REGEX_ONLY_ALPHANUMERIC_AND_DOT = /^[a-zA-Z0-9]*(?:\.[a-z]+)*$/;
export const INVALID_EMAIL_ADDRESS = 'Formato de correo no valido.';
export const INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT = 'Formato no valido para numeros positivos.';
export const INVALID_WEIRD_CHARACTERS_ON_TEXT = 'Texto no valido';
export const REQUIRED_FIELD = 'Este campo es obligatorio.';
export const PASSWORD_MISMATCH = 'No coincide con la contraseña antes ingresada';

/** message types */

export const ERROR_MESSAGE = 'error';
export const WARNING_MESSAGE = 'warning';
export const INFO_MESSAGE = 'info';
export const SUCCES_MESSAGE = 'succes';
