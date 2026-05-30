import * as solid from "solid-js";

export function fetchNui(event, data = {}) {
    if (devMode) {
        console.log(`DevMode: Fetching event "${event}" with data:`, data);
        return Promise.resolve({ success: true });
    } else {
        return fetch(`https://${GetParentResourceName()}/${event}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(res => res.json());
    }
}

export function addListener(eventName, callback) {
    const [listeners, setListeners] = solid.createSignal([]);
    setListeners([...listeners(), { eventName, callback }]);
    solid.createEffect(() => {
        window.addEventListener("message", (event) => {
            if (event.data.action === eventName) {
                callback(event.data);
            }
        });
        return () => {
            window.removeEventListener("message", (event) => {
                if (event.data.action === eventName) {
                    callback(event.data);
                }
            });
        }
    });
}

export function sendMessage(event, data = {}) {
    window.postMessage({ action: event, ...data }, "*");
}

window.fetchNui = fetchNui;
window.addListener = addListener;
window.sendMessage = sendMessage;
console.log("NUI utilities loaded");
