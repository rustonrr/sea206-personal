var ON_USER_NAME_CHANGE = "ON_USER_NAME_CHANGE";

const initialState = {
    subtotal: ''
};



export default function appState(state = initialState, action) {
    switch(action.type) {
        case ON_USER_NAME_CHANGE:
        // console.log(state);
            return {
                ...state,
                userName: action.value
            };
        default: 
            return state;
    }
}

export function onUserNameChange(value) {
    console.log(value)
    return {
        value,
        type: ON_USER_NAME_CHANGE
    }
}