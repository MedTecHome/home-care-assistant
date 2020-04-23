import { SET_PROFILE_FILTER } from '../../../commons/globalText';

export default function setProfileFilterAction(filters) {
  return {
    type: SET_PROFILE_FILTER,
    filters,
  };
}
