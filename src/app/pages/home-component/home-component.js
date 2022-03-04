import { html, LitElement } from "lit";

class HomeComponent extends LitElement {

    render() {

        return html`<h1>Bienvenido al Home!</h1>`;

    }

}

customElements.define('home-component', HomeComponent);