export const NAME_APP = 'HomeCare-View';
export const USERNAME_DOMAIN = '@homecareview.com';

/** text reducers actions */
export const SET_MODAL_VISIBLE = 'SET_MODAL_VISIBLE';

export const ADD_FORM_TEXT = 'Adicionar';
export const EDIT_FORM_TEXT = 'Editar';
export const DELETE_FORM_TEXT = 'Eliminar';
export const DETAILS_FORM_TEXT = 'Detalles';
export const EDIT_USER_PASSWORD_FORM_TEXT = 'Editar usuario y contraseña';

/** validator text */
export const REGEX_EMAIL_ADDRESS = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const REGEX_POSITIVE_NUMBER = /^\d*[1-9]\d*$/;
export const REGEX_POSITIVE_NUMBER_AND_DECIMAL = /^\d*\.?\d*$/;
export const REGEX_ALPHANUMERIC_AND_SPACE = /^[-\w\s]+$/;
// export const REGEX_PHONE = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s.]{0,1}[0-9]{3}[-\s.]{0,1}[0-9]{4}$/;
export const REGEX_PHONE = /^[a-zA-Z0-9\-().\s]{10,15}$/;
export const REGEX_ONLY_ALPHA = /^[a-zA-Z\s]+$/;
export const REGEX_ONLY_ALPHANUMERIC = /^[a-zA-Z0-9]+$/;
export const REGEX_ONLY_ALPHANUMERIC_AND_DOT = /^[a-zA-Z0-9]*(?:\.[a-z]+)*$/;
export const INVALID_PHONE_NUMBER = ' Número de teléfono no válido.';
export const INVALID_EMAIL_ADDRESS = 'Formato de correo no válido.';
export const INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT = 'Formato no válido para números positivos.';
export const INVALID_WEIRD_CHARACTERS_ON_TEXT = 'Texto no válido';
export const REQUIRED_FIELD = 'Este campo es obligatorio.';
export const PASSWORD_MISMATCH = 'No coincide con la contraseña antes ingresada.';

/** message types */

export const ERROR_MESSAGE = 'error';
export const WARNING_MESSAGE = 'warning';
export const INFO_MESSAGE = 'info';
export const SUCCESS_MESSAGE = 'success';
