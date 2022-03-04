const { LitElement, html, css } = require("lit");
const { PageActiveService } = require("../../services/page-active.service");

class MainComponent extends LitElement {

    static get properties() {
        return {
            pageActive: {type: String},
            pageActiveService: {type: PageActiveService}
        }
    }

    constructor() {
        super();
        this.pageActive = 'home';
        this.pageActiveService = PageActiveService.instance;
    }

    static get styles() {
        return css`.container{ margin: 2em 3em }`;
    }

    connectedCallback() {

        super.connectedCallback();
        // this.pageActiveService

    }

    render() {

        return html`
            <div class="container">

                <cards-component></cards-component>
            
            </div>
        `;

    }

}

customElements.define( 'main-component', MainComponent );