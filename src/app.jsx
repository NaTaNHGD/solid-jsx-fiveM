import { createEffect, onMount, createSignal } from "solid-js";
import { render } from "solid-js/web";
import { Counter } from "./components/Counter.jsx";
import { useVisibility, VisibilityProvider } from "./utils/visiblityProvider.jsx";

function App() {
    const [theme, setTheme] = createSignal("dark");
    window.devMode = window.invokeNative ? false : true;
    const { addListener, sendMessage, devMode } = window;
    onMount(() => {
        if (devMode) {
            sendMessage("toggleVisibility", { visible: true });
            const body = document.querySelector("body");
            if (body) {
                body.style.backgroundColor = "transparent";
                body.style.backgroundSize = "100%";
                body.style.backgroundRepeat = "no-repeat";
                body.style.backgroundImage = "url('./public/background.png')";
            }
        }
        addListener("setTheme", (data) => {
            setTheme(data.theme);
        });
    });

    return (
        <VisibilityProvider>
            <div className="app" data-theme={theme()}>
                <Counter />
            </div>
        </VisibilityProvider>
    );
}

render(App, document.getElementById("root"));
