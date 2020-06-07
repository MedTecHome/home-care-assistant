const listAccess = {
  superadmin: ['superadmin', 'admin', 'clinic', 'doctor', 'patient'],
  admin: ['clinic'],
  clinic: ['doctor'],
  doctor: ['patient']
};

export default listAccess;
