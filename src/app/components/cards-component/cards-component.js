import { css, html, LitElement } from "lit";
import { Page } from "../../models/page";

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
            arrData: {type: Array},
            pageItem: {type: Page},
            paginator: {type: Object}
        };

    }

    connectedCallback() {

        super.connectedCallback();
        this.fetchArrData(0, true);

    }

    render() {

        if (!this.arrData) 
        return html`Loading...`;

        return html`${ this.arrData.map(i => 
            html`<card-component .cardItem=${i}></card-component>`) }
            <paginator-component id="paginator" .pageData=${this.pageItem}></paginator-component>`;

    }

    async fetchArrData(pageNumber, first = false) {

        /* setTimeout(async () => {
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
        }, 500); */

        await fetch( 'http://localhost:5500/dist/assets/data/data.json' )
            .then(data => data.json())
            .then(async (data) => {

                const page = new Page(data, pageNumber);
                this.pageItem = page;
                const { firstPage, lastPage } = this.pageItem;
                this.arrData = data.slice( firstPage, lastPage );
                
                await this.updateComplete;
                if (first) {
                    this.paginator = this.shadowRoot.querySelector('#paginator');
                    this.paginator.getDataEvent.asObservable()
                        .subscribe(data => this.fetchArrData(data));
                }
                this.paginator.showPageVisibles();

            });
    }

    concatAddress(data) {
        return data.join(', ');
    }

}

customElements.define( 'cards-component', CardsComponent );