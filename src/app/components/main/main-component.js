const { LitElement, html, css } = require("lit");

class MainComponent extends LitElement {

    static get properties() {
        return {
            active: {type: Boolean}
        }
    }

    constructor() {
        super();

        this.active = false;
    }

    static get styles() {
        return css`.container{ margin: 2em 3em }`;
    }

    render() {

        return html`<div class="container">
        <collapse-component>
                <p>El componente está ${ this.active ? 'activo' : 'desactivado' }!</p>
                        <input @change=${ this.changeState } type="checkbox" ?checked=${this.active} />
                        <button @click=${ this.changeState }>${ this.active ? 'Desactivar' : 'Activar' }</button>
        </collapse-component>

        <br><br>
        <button @click=${this.toggle}>toggle</button>

        </div>`;

    }

    changeState() {

        this.active = !this.active;

    }

    toggle() {

        const collapse = this.shadowRoot.querySelector('collapse-component');

        collapse.toggle();

    }

}

customElements.define( 'main-component', MainComponent );