const listAccess = {
  admin: ['clinic', 'doctor', 'patient', 'admin'],
  clinic: ['doctor'],
  doctor: ['patient'],
  developer: ['patient', 'doctor', 'admin'],
};

export default listAccess;
