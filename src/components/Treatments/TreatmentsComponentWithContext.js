import { withTreatmentsContext } from './TreatmentsContext';
import TreatmentsComponent from './TreatmentsComponent';

const TreatmentsComponentWithContext = withTreatmentsContext(TreatmentsComponent);

export default TreatmentsComponentWithContext;
