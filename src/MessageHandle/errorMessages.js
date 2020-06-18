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
    'El servidor de autenticación encontró un error inesperado cuando se intenta procesar la solicitud.',
  'auth/app-deleted': 'La instancia FirebaseApp ha sido eliminada.',
  'auth/app-not-authorized':
    'Se lanza si la aplicación identificada por el dominio donde está alojada no está autorizada para usar la autenticación de Firebase con la clave API proporcionada.',
  'auth/argument-error': 'Método con argumentos incorrectos',
  'auth/invalid-api-key': 'Clave API proporcionada no es válida.',
  'auth/invalid-user-token': 'La credencial del usuario ya no es válida. debe iniciar sesión nuevamente.',
  'auth/invalid-tenant-id': 'Identificación del inquilino proporcionada no es válida',
  'auth/network-request-failed':
    'Se ha producido un error de red (como tiempo de espera, conexión interrumpida o host inaccesible).',
  'auth/too-many-requests':
    'Las solicitudes han sido bloqueadas debido a una actividad inusual. Intente nuevamente después de algún unos minutos.',
  'auth/unauthorized-domain':
    'Dominio de la aplicación no está autorizado para las operaciones de autenticación para su proyecto Firebase.',
  'auth/user-disabled': 'La cuenta de usuario ha sido deshabilitada por un administrador.',
  'auth/user-token-expired': 'La credencial del usuario ha expirado.',
  'auth/web-storage-unsupported':
    'El navegador no es compatible con el almacenamiento web oah sido desactivado por el usuario.',
  'auth/account-exists-with-different-credential': 'Lanzado si ya existe una cuenta con esa credencial.',
  'auth/credential-already-in-use': 'La cuenta correspondiente a la credencial ya existe entre sus usuarios',
  'auth/email-already-in-use': 'El correo electrónico correspondiente a la credencial ya existe.',
  'auth/wrong-password': 'La contraseña no es válida.',
  'error-interno': 'Ha ocurrido un error interno',
  '404': 'No encontrado'
};

export default ErrorMessages;
