const { LitElement, css, html } = require("lit");

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
                        <span class="navItem">Home</span>
                        <span class="navItem">Data</span>
                        <span class="navItem">Users</span>
                        <span class="navItem">Login</span>    
                    </collapse-nav-component>
                </nav>`;

        } else {

            return html`<nav id="navContainer">
                    <div class="leftContent">
                    <span class="navItem">Home</span>
                    <span class="navItem">Data</span>
                    <span class="navItem">Users</span>
                    </div>
                    <div class="rightContent">
                        <span class="navItem">Login</span>
                    </div>
                    </nav>`;
        }


    }

    static get properties() {
        return {
            showMenuBurger: {
                type: Boolean
            }
        };
    }

    constructor() {

        super();
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

}

customElements.define('navbar-component', NavbarComponent);