import { LitElement, html, css } from "lit";
import "./Debug";

export default class ContractModule extends LitElement {
  static get properties() {
    return {
      adminDate: { type: String },
      key: { type: Array },
      name: { type: Array },
      comment: { type: Array },
      selectedKey: { type: String },
    };
  }

  static get styles() {
    return css`
      #container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        border: 2px #333 solid;
        border-radius: 25px;
        padding: 2rem;
        margin: 1rem;
      }
      textarea {
        width: 100%;
        min-height: 200px;
      }
      #result {
        border: 2px #333 solid;
        border-radius: 25px;
        padding: 2rem;
        font-size: 1.2rem;
      }
    `;
  }

  constructor() {
    super();
    this.adminDate = "2021-01-01";
    this.name = ["Household", "Bicycle"];
    this.key = ["HOUSEHOLD", "BICYCLE"];
    this.comment = [
      "The flat of the policy holder is 100 square meters",
      "The policyholder is happy to insure his new E-Bike also within the contract",
    ];
    this.selectedKey = "HOUSEHOLD";
  }

  commentChangeHanlder(e) {
    this.selectedKey === "HOUSEHOLD"
      ? (this.comment[0] = e.target.value)
      : (this.comment[1] = e.target.value);
    this.requestUpdate;
  }

  getSelectedDate(e) {
    this.adminDate = e.target.value;
  }

  keyHandler(e) {
    this.selectedKey = e.target.value;
  }

  render() {
    return html`
      <div id="container">
        <div className="contractMode">
          <h4>Contract Module</h4>
          <select @change=${this.keyHandler}>
            <option>${this.key[0]}</option>
            <option>${this.key[1]}</option>
          </select>
        </div>
        <div className="comments">
          <textarea
            @change=${this.commentChangeHanlder}
            placeholder=${this.comment[0]}
          ></textarea>
          <h4>Administrative Data</h4>
          <input
            type="date"
            value=${this.adminDate}
            @change=${this.getSelectedDate}
          />
        </div>
        <div id="result">
          <debug-page
            selectedDate=${this.adminDate}
            .key=${this.key}
            .name=${this.name}
            .newComment=${this.comment}
          ></debug-page>
        </div>
      </div>
    `;
  }
}

customElements.define("contract-module", ContractModule);
