const { LitElement, html } = require("lit");

class AppComponent extends LitElement {

    render() {

        return html`
        
            <navbar-component></navbar-component>
            <main-component></main-component>
        `;

    }

}

customElements.define('app-component', AppComponent);