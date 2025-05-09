export const initialState = {
    name: "",
    email: "",
    password: "",
    };
    
    export function formReducer(state, action) {
    switch (action.type) {
    case "UPDATE_FIELD":
    return { ...state, [action.field]: action.value };
    case "RESET":
    return initialState;
    default:
    return state;
    }
    }