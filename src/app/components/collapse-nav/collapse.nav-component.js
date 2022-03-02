const { LitElement, html, css } = require("lit");
import {classMap} from 'lit/directives/class-map.js';

class CollapseNavComponent extends LitElement {

    static get styles() {
        return css`
            .collapseContainer {
                padding: 1em;
                display: flex;
                flex-direction: column;
            }

            .collapsed {
                padding: 0 18px;
            }

            .content {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.2s ease-out;
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

customElements.define('collapse-nav-component', CollapseNavComponent);