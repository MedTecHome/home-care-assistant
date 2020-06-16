/* eslint-disable max-classes-per-file */
import moment from 'moment';

const mutateValues = async ({ birthday, ...rest }) => ({
  ...rest,
  birthday: moment(birthday).toDate()
});

class Profile {
  constructor({ name, lastName = '', email, username, emailVisible = false, role }) {
    this.name = name.toLowerCase();
    this.lastName = lastName.toLowerCase();
    this.email = email;
    this.username = username;
    this.emailVisible = emailVisible;
    this.role = role;
  }

  toJSON() {
    return Object.getOwnPropertyNames(this).reduce((a, b) => {
      const aux = a;
      aux[b] = this[b];
      return aux;
    }, {});
  }
}

class Clinic extends Profile {
  constructor({
    primaryPhone,
    secondaryPhone = '',
    phoneVisible = false,
    secondaryPhoneVisible = false,
    maxDoctors,
    maxPatients,
    address = '',
    logoUrl = '',
    parent,
    ...profile
  }) {
    super(profile);
    this.logoUrl = logoUrl;
    this.primaryPhone = primaryPhone;
    this.secondaryPhone = secondaryPhone;
    this.phoneVisible = phoneVisible;
    this.secondaryPhoneVisible = secondaryPhoneVisible;
    this.maxDoctors = maxDoctors;
    this.realDoctors = 0;
    this.maxPatients = maxPatients;
    this.address = address;
    this.parent = parent;
  }
}

class Doctor extends Profile {
  constructor({
    primaryPhone,
    secondaryPhone = '',
    phoneVisible = false,
    secondaryPhoneVisible = false,
    parent,
    ...profile
  }) {
    super(profile);
    this.primaryPhone = primaryPhone;
    this.secondaryPhone = secondaryPhone;
    this.phoneVisible = phoneVisible;
    this.secondaryPhoneVisible = secondaryPhoneVisible;
    this.parent = parent;
  }
}

class Patient extends Profile {
  constructor({
    sex,
    height,
    birthday,
    address = '',
    primaryPhone,
    secondaryPhone = '',
    phoneVisible = false,
    secondaryPhoneVisible = false,
    parent,
    ...profile
  }) {
    super(profile);
    this.primaryPhone = primaryPhone;
    this.secondaryPhone = secondaryPhone;
    this.phoneVisible = phoneVisible;
    this.secondaryPhoneVisible = secondaryPhoneVisible;
    this.sex = sex;
    this.height = height;
    this.birthday = birthday;
    this.address = address;
    this.parent = parent;
  }
}

const specificProfile = values => {
  switch (values.role) {
    case 'patient': {
      return new Patient(mutateValues(values));
    }
    case 'doctor': {
      return new Doctor(values);
    }
    case 'clinic': {
      return new Clinic(values);
    }
    case 'admin': {
      return new Profile(values);
    }
    default:
      throw new Error('Specify a type of profile');
  }
};

export default specificProfile;
