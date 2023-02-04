import AppState from "./AppState";

const Reducer = (state = AppState, action) => {
    let newTaskList = state.data;
    switch (action.type) {
        case 'FINISH':
            newTaskList[action.atIndex].isFinished = true;
            return { ...state, data: newTaskList };
            break;
        case 'DELETE':
            newTaskList = newTaskList.filter((item, i) => i != action.atIndex);
            return { ...state, data: newTaskList };
            break;
        case 'ADD':
            const newTask = { title: action.title, isFinished: false };
            return { ...state, data: [...newTaskList, newTask] };
            break;
        case 'CHANGE_PRODUCT':
            return { ...state, product_id: action.product_id };
            break;
        case 'UPDATE_SID':
            return {
                ...state, _tha_sid: action.sid
            };
            break;
        case 'UPDATE_CART':
            return {
                ...state, cart_data: action.cart_data
            };
            break;
        default:
            break;
    }
    return state;
};

const NumberReducer = (state = AppState, action) => {
    let new_num;
    switch (action.type) {
        case "ADD_NUMBER":
            new_num = state.number += 1;
            return { ...state, number: new_num };
            break;
        case "SUB_NUMBER":
            new_num = state.number -= 1;
            return { ...state, number: new_num };
            break;

        default:
            break;
    }
    return state;
};

export { Reducer, NumberReducer };