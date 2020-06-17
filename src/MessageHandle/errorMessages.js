const ErrorMessages = {
  ERROR_CONECTION: 'Error en la conexión al servidor.',
  'auth/id-token-expired': 'La sessión a expirado.',
  'auth/id-token-revoked': 'Se revocó el token de ID.',
  'auth/invalid-argument': 'Argumento no válido.',
  'auth/invalid-disabled-field': 'Valor de la propiedad usuario disabled no es válido.',
  'auth/invalid-email-verified':
    'El valor que se proporcionó para la propiedad del usuario emailVerified no es válido.',
  'auth/invalid-email': 'El valor que se proporcionó para la propiedad email no es válido.',
  'auth/invalid-id-token': 'El token de ID que se proporcionó no es un token de ID de Firebase válido.',
  'auth/invalid-password': 'Password no válido, debe ser una string con no menos de seis caracteres.',
  'auth/invalid-uid': 'El uid proporcionado debe ser una string no vacía con un máximo de 128 caracteres.',
  'auth/invalid-user-import': 'El registro de usuarios para importar no es válido.',
  'auth/missing-uid': 'Se requiere un identificador uid para la operación actual.',
  'auth/session-cookie-expired': 'La cookie proporcionada de la sesión de Firebase venció.',
  'auth/session-cookie-revoked': 'Se revocaron las cookies de la sesión de Firebase.',
  'auth/uid-already-exists': 'Otro usuario ya utiliza el uid proporcionado.',
  'auth/email-already-exists':
    'Otro usuario ya está utilizando el correo electrónico proporcionado. Cada usuario debe tener un correo electrónico único.',
  'auth/user-not-found': 'No existe ningún registro de usuario que corresponda al identificador proporcionado.',
  'auth/operation-not-allowed': 'Operación no permitida.',
  'auth/invalid-credential': 'La credencial actual no se puede emplear para realizar la acción deseada.',
  'auth/insufficient-permission': 'No tiene permisos suficientes para acceder al recurso de autenticación solicitado.',
  'auth/internal-error':
    'El servidor de autenticación encontró un error inesperado cuando se intenta procesar la solicitud.'
};

export default ErrorMessages;
