import { css, html, LitElement } from "lit";

class CardComponent extends LitElement {

    static get styles() {

        return css`

            .card {

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border: 1px solid white;
                border-radius: 7px;
                padding: 1em;
                background-color: rgb(2, 76, 136);
                color: white;
                box-shadow: 2px 2px 4px #00000080;
                cursor: pointer;

            }

            .card:hover {
                background-color: rgb(47, 124, 187);
            }

            .cardBody {
                
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                
            }

            .cardBody > p {

                text-align: center;
                width: 80%;
                padding: 0 1em;
                border-bottom: 2px solid rgba(146, 146, 146, 0.616);
                margin-bottom: 0;
                padding-bottom: 1em;

            }

            h3 {

                color: white;
                text-shadow: 4px 4px 4px #00000080;

            }



        `;

    }

    static get properties() {
        return {

            cardItem: {
                type: Object
            }

        };
    }

    render() {

        if ( !this.cardItem )
        return html`There isn't data`;

        const { address, companyName, name, email, id, phone, username } = this.cardItem;
        return html`
                    <div class="card">
                        <div class="cardBody">
                            <h3>@${username}</h3>
                            <p>Name: ${ name }</p>
                            <p>Email: ${ email }</p>
                            <p>Phone: ${ phone }</p>
                            <p>Address: ${ address }</p>
                            <p>Company: ${ companyName }</p>
                            </div>
                        <p>id: ${ id }</p>
                    </div>`;

    }

}

customElements.define( 'card-component', CardComponent );