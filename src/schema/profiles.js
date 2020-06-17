/* eslint-disable max-classes-per-file */
import moment from 'moment';

const mutateValues = ({ birthday, ...rest }) => ({
  ...rest,
  birthday: moment(birthday).toDate()
});

class Profile {
  constructor({ name, lastName = '', email, username, emailVisible = false, role }) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.emailVisible = emailVisible;
    this.role = role;
  }

  toJSON() {
    return Object.getOwnPropertyNames(this).reduce((a, b) => {
      if (this[b] === undefined || this[b] === null) throw new Error(`Field ${b} is required`);
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
    phoneSecondaryVisible = false,
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
    this.phoneSecondaryVisible = phoneSecondaryVisible;
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
    phoneSecondaryVisible = false,
    parent,
    ...profile
  }) {
    super(profile);
    this.primaryPhone = primaryPhone;
    this.secondaryPhone = secondaryPhone;
    this.phoneVisible = phoneVisible;
    this.phoneSecondaryVisible = phoneSecondaryVisible;
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
    phoneSecondaryVisible = false,
    parent,
    agreement,
    ...profile
  }) {
    super(profile);
    this.primaryPhone = primaryPhone;
    this.secondaryPhone = secondaryPhone;
    this.phoneVisible = phoneVisible;
    this.phoneSecondaryVisible = phoneSecondaryVisible;
    this.sex = sex;
    this.height = height;
    this.birthday = birthday;
    this.address = address;
    this.parent = parent;
    this.agreement = agreement;
  }
}

const specificProfile = values => {
  switch (values.role) {
    case 'patient': {
      return new Patient(mutateValues(values)).toJSON();
    }
    case 'doctor': {
      return new Doctor(values).toJSON();
    }
    case 'clinic': {
      return new Clinic(values).toJSON();
    }
    case 'admin': {
      return new Profile(values).toJSON();
    }
    default:
      throw new Error('Specify a type of profile');
  }
};

export default specificProfile;
