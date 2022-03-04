import { html, LitElement } from "lit";

class UsersComponent extends LitElement {

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