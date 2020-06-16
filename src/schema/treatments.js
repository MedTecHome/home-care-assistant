class Treatment {
  constructor({ medicine, medicineSettings, user, startDate, endDate }) {
    this.medicine = medicine;
    this.medicineSettings = medicineSettings;
    this.user = user;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  toJSON() {
    return Object.getOwnPropertyNames(this).reduce((a, b) => {
      const aux = a;
      aux[b] = this[b];
      return aux;
    }, {});
  }
}

export default Treatment;
