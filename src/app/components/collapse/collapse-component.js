const { LitElement, html, css } = require("lit");
import {classMap} from 'lit/directives/class-map.js';

class CollapseComponent extends LitElement {

    static get styles() {
        return css`
            .collapseContainer {
                border: 1px solid black;
                border-radius: 7px;
                padding: 1em;
            }

            .collapsed {
                border: none;
                padding: 0 18px;
            }

            .content {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.2s ease-out;
                background-color: #f1f1f1;
            }
        `;
    }

    render() {

        const classes = { collapseContainer: true, content: true, collapsed: !this.collapsed }
        return html`
                <div id="collapseContainer" class=${classMap(classes)}>
                    <slot></slot>
                </div>
                `;

    }

    static get properties() {
        return {
            collapsed: {type: Boolean}
        }
    }

    constructor() {
        super();
        this.collapsed = false;
    }

    toggle() {
        
        const content = this.shadowRoot.querySelector( '#collapseContainer' );

        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }

        this.collapsed = !this.collapsed;


    }

}

customElements.define('collapse-component', CollapseComponent);