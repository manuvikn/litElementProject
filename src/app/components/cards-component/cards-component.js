import { css, html, LitElement } from "lit";

class CardsComponent extends LitElement {

    static get styles() {

        return css`

            :host {

                display: flex;
                flex-wrap: wrap;
                column-gap: 2em;
                row-gap: 1em;
                justify-content: center;
                align-items: center;
                padding-bottom: 2em; 

            }

        `;

    }

    static get properties() {

        return {
            arrData: {type: Array}
        };

    }

    connectedCallback() {

        super.connectedCallback();
        this.fetchArrData();

    }

    render() {

        if (!this.arrData) 
        return html`Loading...`;

        return html`${ this.arrData.map(i => 
            html`<card-component .cardItem=${i}></card-component>`) }`;

    }

    fetchArrData() {

        setTimeout(async () => {
            this.arrData = 
            await fetch( 'https://jsonplaceholder.typicode.com/users')
                .then( data => data.json() )
                .then( data => data.map(
                ({id, name, username, email, phone,
                company: { name: companyName },
                address: {street, zipcode, suite, city}}) => {
                return ({id, name, username, email, 
                    phone, companyName,
                    address: ( this.concatAddress(
                        [street, suite, city, zipcode]
                    ))
                });
                }))
        }, 500);

    }

    concatAddress(data) {
        return data.join(', ');
    }

}

customElements.define( 'cards-component', CardsComponent );