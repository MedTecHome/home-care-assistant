/** text reducers actions */
export const SET_MODAL_VISIBLE = 'SET_MODAL_VISIBLE';
/** hospitals */
export const LIST_HOSPITAL = 'LIST_HOSPITAL';
export const LIST_HOSPITAL_LOADING = 'LIST_HOSPITAL_LOADING';
export const SELECTED_HOSPITAL = 'SELECTED_HOSPITAL';

/** profiles */
export const LIST_PROFILES_LOADING = 'LIST_PROFILES_LOADING';
export const LIST_PROFILES = 'LIST_PROFILES';
export const LIST_PROFILES_NOMENCLADOR = 'LIST_PROFILES_NOMENCLADOR';
export const SELECTED_PROFILE = 'SELECTED_PROFILE';
export const SET_PROFILE_FILTER = 'SET_PROFILE_FILTER';

export const ADD_FORM_TEXT = 'ADD_FORM_TEXT';
export const EDIT_FORM_TEXT = 'EDIT_FORM_TEXT';
export const DELETE_FORM_TEXT = 'DELETE_FORM_TEXT';
export const DETAILS_FORM_TEXT = 'DETAILS_FORM_TEXT';

/** validator text */
export const REGEX_EMAIL_ADDRESS = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const REGEX_POSITIVE_NUMBER = /^\d*[1-9]\d*$/;
export const REGEX_POSITIVE_NUMBER_AND_DECIMAL = /^\d*\.?\d*$/;
export const REGEX_ALPHANUMERIC_AND_SPACE = /^[-\w\s]+$/;
export const REGEX_ONLY_ALPHA = /^[a-zA-Z\s]+$/;
export const INVALID_EMAIL_ADDRESS = 'Formato de correo no valido.';
export const INVALID_DECIMAL_AND_NUMBER_POSITIVE_FORMAT = 'Formato no valido para numeros positivos.';
export const INVALID_WEIRD_CHARACTERS_ON_TEXT = 'Texto no valido';
export const REQUIRED_FIELD = 'Este campo es obligatorio.';
export const PASSWORD_MISMATCH = 'No coincide con la contraseña antes ingresada';
