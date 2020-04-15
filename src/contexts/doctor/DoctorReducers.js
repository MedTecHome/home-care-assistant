export const initialState = {
    doctor: null,
    doctors: [],
};

export default (state, action)=> {
    switch (action.type) {
        case 'SELECTED_DOCTOR':
            return {
                ...state, doctor: action.doctor
            };
        default:
            return state;
    }
}