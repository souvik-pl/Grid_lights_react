import { useReducer, useState } from "react";

type LightState = {
    [key: string]: boolean | null;
};

type LightAction = {
    status: 'on' | 'off'
    lightNum: string
};

const initialState: LightState = {
    light1: false,
    light2: false,
    light3: false,
    light4: false,
    light5: null,
    light6: false,
    light7: false,
    light8: false,
    light9: false,
};

function reducer(state: LightState, action: LightAction) {
    switch (action.status) {
        case 'on':
            return {
                ...state,
                [action.lightNum]: true,
            }
        case 'off':
            return {
                ...state,
                [action.lightNum]: false
            }
        default:
            return state;
    }
}

const useApp = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [stack, setStack] = useState<string[]>([]);

    function lightClickHandler(light: [string, boolean | null]) {
        return function () {
            if (state[light[0]] !== true) {
                dispatch({ status: 'on', lightNum: light[0] });
                const currentStack = stack;
                currentStack.push(light[0])
                setStack([...currentStack]);
                
                if (currentStack.length === (Object.entries(state).length - 1)) {
                    turnLightsOff();
                }
            }
        }
    }

    function turnLightsOff() {
        const interval = setInterval(() => { 
            const currentStack = stack;
            const lightNumber = currentStack.pop();
            dispatch({ status: 'off', lightNum: lightNumber as string });
            setStack([...currentStack]);
            if (currentStack.length === 0) {
                clearInterval(interval);
            }
        }, 300);
    }

    return {
        state,
        lightClickHandler
    }
}

export default useApp;