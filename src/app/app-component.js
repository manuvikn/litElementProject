const { LitElement, html } = require("lit");

class AppComponent extends LitElement {

    render() {

        return html`
        
            <navbar-component></navbar-component>
            <main-component></main-component>
            <collapse-component>Hola mundo</collapse-component>
        `;

    }

}

customElements.define('app-component', AppComponent);