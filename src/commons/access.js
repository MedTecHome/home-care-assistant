const listAccess = {
  develop: ['clinic', 'doctor', 'patient', 'admin'],
  admin: ['clinic'],
  clinic: ['doctor'],
  doctor: ['patient'],
  developer: ['patient', 'doctor', 'admin']
};

export default listAccess;
