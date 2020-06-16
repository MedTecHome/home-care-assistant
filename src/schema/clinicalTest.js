/* eslint-disable max-classes-per-file */
import { formatDateWithTime } from '../helpers/utils';

const pressureMutate = ({
  bloodPressureHeartrate,
  bloodPressureNota = '',
  bloodPressureDate,
  bloodPressureTime,
  ...rest
}) => ({
  ...rest,
  heartrate: bloodPressureHeartrate,
  clinicalDate: formatDateWithTime(bloodPressureDate, bloodPressureTime),
  note: bloodPressureNota
});

const heartrateMutate = ({ heartrateNota, heartrateDate, heartrateTime, ...rest }) => ({
  ...rest,
  clinicalDate: formatDateWithTime(heartrateDate, heartrateTime),
  note: heartrateNota
});

const temperatureMutate = ({ temperatureNote, temperatureDate, temperatureTime, ...rest }) => ({
  ...rest,
  clinicalDate: formatDateWithTime(temperatureDate, temperatureTime),
  note: temperatureNote
});

const weightMutate = ({ weightDate, weightTime, weightNote, ...rest }) => ({
  ...rest,
  clinicalDate: formatDateWithTime(weightDate, weightTime),
  note: weightNote
});

const glucoseMutate = ({ glucoseNote = '', glucoseDate, glucoseTime, ...rest }) => ({
  ...rest,
  clinicalDate: formatDateWithTime(glucoseDate, glucoseTime),
  note: glucoseNote
});

const breathingMutate = ({ breathingtDate, breathingTime, breathingNote = '', ...rest }) => ({
  ...rest,
  clinicalDate: formatDateWithTime(breathingtDate, breathingTime),
  note: breathingNote
});

const inrMutate = ({ coagulationInrNote = '', coagulationInrDate, coagulationInrTime, ...rest }) => ({
  ...rest,
  clinicalDate: formatDateWithTime(coagulationInrDate, coagulationInrTime),
  note: coagulationInrNote
});

const oxygenMutate = ({ oxygenDate, oxygenTime, oxygenNote = '', ...rest }) => ({
  ...rest,
  clinicalDate: formatDateWithTime(oxygenDate, oxygenTime),
  note: oxygenNote
});

const exercicesMutate = ({ exercisesDate, exercisesTime, exercisesNote = '', ...rest }) => ({
  ...rest,
  clinicalDate: formatDateWithTime(exercisesDate, exercisesTime),
  note: exercisesNote
});

const othersMutate = ({ othersDate, othersTime, ...rest }) => ({
  ...rest,
  clinicalDate: formatDateWithTime(othersDate, othersTime)
});

class ClinicalTest {
  constructor({ user, clinicalDate, note = '' }) {
    this.user = user;
    this.clinicalDate = clinicalDate;
    this.note = note;
  }

  toJSON() {
    return Object.getOwnPropertyNames(this).reduce((a, b) => {
      const aux = a;
      aux[b] = this[b];
      return aux;
    }, {});
  }
}

class Pressure extends ClinicalTest {
  constructor({ sistolica, diastolica, heartrate, ...rest }) {
    super(rest);
    this.sistolica = sistolica;
    this.diastolica = diastolica;
    this.heartrate = heartrate;
  }
}

class Heartrate extends ClinicalTest {
  constructor({ heartrate, ...rest }) {
    super(rest);
    this.heartrate = heartrate;
  }
}

class Temperature extends ClinicalTest {
  constructor({ celsiusDegree, ...rest }) {
    super(rest);
    this.celsiusDegree = celsiusDegree;
  }
}

class Weight extends ClinicalTest {
  constructor({ weight, ...rest }) {
    super(rest);
    this.weight = weight;
  }
}

class Glucose extends ClinicalTest {
  constructor({
    sugarConcentration,
    shedule,
    intakeTime,
    glucoseUnity,
    hba1c = '',
    insulinaFood = '',
    basal = '',
    breadUnity = '',
    ...rest
  }) {
    super(rest);
    this.sugarConcentration = sugarConcentration;
    this.shedule = shedule;
    this.intakeTime = intakeTime;
    this.glucoseUnity = glucoseUnity;
    this.hba1c = hba1c;
    this.insulinaFood = insulinaFood;
    this.basal = basal;
    this.breadUnity = breadUnity;
  }
}

class InrTest extends ClinicalTest {
  constructor({ INR, ...rest }) {
    super(rest);
    this.INR = INR;
  }
}

class Breathing extends ClinicalTest {
  constructor({ EtCO, breathingFrecuency, breathingPI, ...rest }) {
    super(rest);
    this.EtCO = EtCO;
    this.breathingFrecuency = breathingFrecuency;
    this.breathingPI = breathingPI;
  }
}

class Oxygen extends ClinicalTest {
  constructor({ SpO2, heartbeat, oxygenPI, ...rest }) {
    super(rest);
    this.SpO2 = SpO2;
    this.heartbeat = heartbeat;
    this.oxygenPI = oxygenPI;
  }
}

class Exercise extends ClinicalTest {
  constructor({ distance, time, steps, ...rest }) {
    super(rest);
    this.distance = distance;
    this.time = time;
    this.steps = steps;
  }
}

class Others extends ClinicalTest {
  constructor({ othersName, severity, ...rest }) {
    super(rest);
    this.othersName = othersName;
    this.severity = severity;
  }
}

const specifyClinicalTest = (type, values) => {
  switch (type) {
    case 'pressure': {
      return new Pressure(pressureMutate(values));
    }
    case 'heartrate': {
      return new Heartrate(heartrateMutate(values));
    }
    case 'temperature': {
      return new Temperature(temperatureMutate(values));
    }
    case 'weight': {
      return new Weight(weightMutate(values));
    }
    case 'glucose': {
      return new Glucose(glucoseMutate(values));
    }
    case 'inr': {
      return new InrTest(inrMutate(values));
    }
    case 'breathing': {
      return new Breathing(breathingMutate(values));
    }
    case 'oxygen': {
      return new Oxygen(oxygenMutate(values));
    }
    case 'exercises': {
      return new Exercise(exercicesMutate(values));
    }
    case 'otherstest': {
      return new Others(othersMutate(values));
    }

    default:
      throw new Error('Specify type of test');
  }
};

export default specifyClinicalTest;
