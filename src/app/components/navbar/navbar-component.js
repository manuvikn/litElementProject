const { LitElement, css, html } = require("lit");
const { PageActiveService } = require("../../services/page-active.service");

class NavbarComponent extends LitElement {

    static get styles() {

        return css`
            #navContainer {

                background-color: rgb(1, 105, 165);
                color: white;
                display: flex;
                justify-content: space-between;
                padding: 1em;
            }

            .leftContent {

                display: flex;
                column-gap: 1em;

            }

            .rightContent {

                display: flex;
                column-gap: 1em;

            }

            .navItem {

                padding: 1em;
                border-radius: 7px;
                cursor: pointer;

            }

            .navItem:hover {

                background-color: rgb(11, 73, 109);

            } 
            .directionColumn {
                flex-direction: column;
            }

            #buttonMenu {
                cursor: pointer;
                border-radius: '0px';
                padding: 1em;
                background-color: rgb(11, 73, 109);
                color: white;
                border: 0;
                font-weight: bold;
            }
            `;

    }

    render() {

        if (this.showMenuBurger) {

            return html`
                <nav id="navContainer" class="directionColumn">
                   <button @click=${this.toggleMenu} id="buttonMenu">Toggle</button> 
                    <collapse-nav-component id="contentMenu">
                        ${this.itemsNavLeft.map(item => {
                            return html`<span @click=${this.navigateTo(item)}
                            class="navItem">${item}</span>`
                        })}
                        ${this.itemsNavRight.map(item => {
                            return html`<span @click=${this.navigateTo(item)} 
                            class="navItem">${item}</span>`
                        })}
                        </collapse-nav-component>
                </nav>`;

        } else {

            return html`<nav id="navContainer">
                    <div class="leftContent">
                    ${this.itemsNavLeft.map(item => {
                        return html`<span @click=${this.navigateTo(item)} 
                        class="navItem">${item}</span>`
                    })}
                    </div>
                    <div class="rightContent">
                    ${this.itemsNavRight.map(item => {
                        return html`<span @click=${this.navigateTo(item)} 
                        class="navItem">${item}</span>`
                    })}
                    </div>
                    </nav>`;
        }


    }

    static get properties() {
        return {
            showMenuBurger: {
                type: Boolean
            },
            itemsNavLeft: {
                type: Array
            },
            itemsNavRight: {
                type: Array
            },
            pageActiveService: {
                type: PageActiveService
            }
        };
    }

    constructor() {

        super();
        this.pageActiveService = PageActiveService.instance;
        this.itemsNavLeft = ['Home', 'Data', 'Users'];
        this.itemsNavRight = ['Login'];
        this.mql = window.matchMedia('(min-width: 600px)');
        this.testMql(this.mql);
        this.addMqlEvent();

    }

    addMqlEvent() {
        this.mql.onchange = (e) => this.testMql(e);
    }

    testMql({ matches }) {
        if (matches) {
            // console.log(this.navItemsLeft.push('Hola mundo'));
            // this.set('navItemsLeft', [...this.navItemsLeft]);

            this.showMenuBurger = false;
        } else {
            this.showMenuBurger = true;
        }

    }

    toggleMenu() {

        const contentMenu = this.shadowRoot.querySelector('#contentMenu');
        contentMenu.toggle();

    }

    navigateTo(pageActive) {

        const path = pageActive.toLowerCase().concat( '-component' );

        return () => this.pageActiveService.pageActive.next( path );

    }

}

customElements.define('navbar-component', NavbarComponent);