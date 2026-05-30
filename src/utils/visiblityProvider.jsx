import {
    createContext,
    createSignal,
    useContext,
    onMount,
    onCleanup,
    createEffect
} from "solid-js";

import { addListener, sendMessage } from "./nui.jsx";

const VisibilityContext = createContext();

export function VisibilityProvider(props) {

    const [visible, setVisible] = createSignal(false);

    const { devMode } = window;
    
    onMount(() => {
        console.log("Dev mode:", devMode);
        addListener("toggleVisibility", (data) => {
            console.log("Received toggleVisibility event with data:", data);
            setVisible(data.visible);
        });
    });

    return (
        <VisibilityContext.Provider value={{
            visible,
            setVisible
        }}>
            {props.children}
        </VisibilityContext.Provider>
    );
}

export function useVisibility() {
    return useContext(VisibilityContext);
}