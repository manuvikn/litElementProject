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
        this.pageActiveService = PageActiveService.instance;
    }

    static get styles() {
        return css`.container {
                margin: 2em 3em;
            }`;
    }

    connectedCallback() {

        super.connectedCallback();
        this.pageActiveService.pageActive.asObservable()
            .subscribe(data => this.pageActive = data);
        this.pageActiveService.pageActive.next( 'home-component' );    

    }

    render() {

        return html`
            <div class="container">

                ${this.switchPage(this.pageActive)}
            
            </div>
        `;

    }

    switchPage( pageActive ) {

        switch(pageActive) {
            case 'users-component':
                return html`<users-component></users-component>`;
                break;
            case 'home-component':
                return html`<home-component></home-component>`;
                break;
            default:
                return html`<h1>Not Found</h1>`;
                break;
        }

    }

}

customElements.define( 'main-component', MainComponent );