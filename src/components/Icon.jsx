import { onMount } from "solid-js";

// Componente Icon para usar Iconify no SolidJS
export function Icon(props) {
    onMount(() => {
        // Importa o web component do Iconify
        import('iconify-icon');
    });

    return (
        <iconify-icon 
            icon={props.icon}
            width={props.width || props.size || "1em"}
            height={props.height || props.size || "1em"}
            style={props.style}
            class={props.class}
            flip={props.flip}
            rotate={props.rotate}
        />
    );
}
