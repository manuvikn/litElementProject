import { html, LitElement } from "lit";
import { PageActiveService } from "../../services/page-active.service";

class UsersComponent extends LitElement {

    static get properties() {

        return {
            pageActiveService: {type: PageActiveService}
        };

    }

    constructor() {

        super();
        this.pageActiveService = PageActiveService.instance;

    }


    render() {

        return html`
            <h1>Lista de usuarios</h1>
            <cards-component></cards-component>
        `;

    }

    connectedCallback() {

        super.connectedCallback();
        this.pageActiveService.pageActive.next('users-component');

    }

}

customElements.define('users-component', UsersComponent);