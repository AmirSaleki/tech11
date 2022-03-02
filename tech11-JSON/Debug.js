import { LitElement, html, css } from "lit";

export default class Debug extends LitElement {
  static get properties() {
    return {
      selectedDate: { type: String },
      key: { type: Array },
      name: { type: Array },
      newComment: { type: Array },
    };
  }

  constructor() {
    super();
    this.name = ["0", "1"];
    this.key = ["0", "1"];
    this.newComment = ["0", "1"];
  }

  render() {
    return html`
      <div id="container">
        <pre>
  contract: {
    administrativeData: {
      validFrom: "${this.selectedDate}",
    },
    contractModules: {
      {HOUSEHOLD}: {
        key: "${this.key[0]}",
        name: "${this.name[0]}",
        comments: "${this.newComment[0]}",
      },
      BICYCLE: {
        key: "${this.key[1]}",
        name: "${this.name[1]}",
        comments: "${this.newComment[1]}",
      },
    },
  }
      </pre
        >
      </div>
    `;
  }
}

customElements.define("debug-page", Debug);
