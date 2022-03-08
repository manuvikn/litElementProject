const { LitElement, css, html } = require("lit");
import {classMap} from 'lit/directives/class-map.js';
const { Subject } = require("rxjs");

class PaginatorComponent extends LitElement {

    static get styles() {

        return [css`

            :host {
                width: 100%;
            }

            .pageActive {
                pointer-events: none;
                z-index: 1;
            }

            .active {
                background-color: rgb(2, 76, 136);
                color: white;
            }

            .disabled {
                background-color: gray;
                color: white;
            }
            
            .page-item {
                cursor: pointer;
                padding: 8px;
                border-radius: 2px;
            }

            ul {
                list-style-type: none;
                display: flex;
                column-gap: 0px;
                row-gap: 1em;
                padding: 0;
                justify-content: center;
                align-items: center;
            }
        `];

    }

    static get properties() {

        return {

            getDataEvent: {type: Subject},
            pageData: {type: Object},
            pageVisibles: {type: Array}

        };

    }

    constructor() {

        super();
        this.getDataEvent = new Subject();

    }

    render() {

        if (!this.pageVisibles) 
        return html``;

        const classes = { 'page-item': true, disabled: this.pageData.first, pageActive: this.pageData.first };
        const classesB = { 'page-item': true, disabled: this.pageData.last, pageActive: this.pageData.last };
        return html`
            <nav aria-label="Paginación">
                <ul>
                <li @click=${this.getAllData(0)} class=${classMap(classes)}>
                    <span class="page-link">Primera</span>
                </li>
                <li class=${classMap(classes)} @click=${this.getAllData(this.pageData.number - 1)}>
                    <span class="page-link">Aterior</span>
                </li>

                ${this.pageVisibles.map(i => {

                    var classes = { 'page-item': true, active: this.pageData.number == i, pageActive: this.pageData.number == i };
                    return html`<li @click=${ this.getAllData(i) } class=${classMap(classes)}>
                    <span class="page-link" href="#">${i + 1}</span>
                    </li>`

                })}
                
                <li class=${classMap(classesB)} @click=${this.getAllData(this.pageData.number + 1)}>
                    <span class="page-link">Siguiente</span>
                </li>
                <li @click=${this.getAllData(this.pageData.totalPages - 1)}
                class=${classMap(classesB)}>
                    <span class="page-link">Última</span>
                </li>
                </ul>
            </nav>
        `;

    }

    showPageVisibles() {

        const {number: currentPage, totalPages: totalPages} = this.pageData;
        let firstPage = currentPage < 2 ? 0 : (currentPage - 2);
        let lastPage;

        if ((currentPage + 2) >= totalPages) {
            lastPage = totalPages;
            firstPage = totalPages - 5;
        } else {
            lastPage = firstPage + 5;
        }

        this.pageVisibles = new Array(totalPages).fill(0).map((_v, i) => i ).slice(firstPage, lastPage);

    }

    getAllData(pageNumber) {
        return () => this.getDataEvent.next( pageNumber );
    }


}

customElements.define('paginator-component', PaginatorComponent);