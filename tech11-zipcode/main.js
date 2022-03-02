import { LitElement, html, css } from "lit";

export default class Tech11Zipcode extends LitElement {
  // defining variables
  static get properties() {
    return {
      allData: { type: Array },
      zipcode: { type: Number },
      city: { type: String },
      street: { type: Array },
      selectedSt: { type: String },
      zipcode: { type: Number },
      houseNumber: { type: Number },
      country: { type: String },
    };
  }
  // styling the dom
  static get styles() {
    return css`
      .container {
        padding: 3rem;
        width: 100%;
        border: solid 2px #333;
        border-radius: 10px;
        color: #333;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      label {
        font-size: large;
        font-weight: 400;
      }
    `;
  }
  // variable initialize
  constructor() {
    super();
    this.street = ["Straße"];
    this.country = "Deutschland";
  }

  async getData(event) {
    //get the data from API
    this.zipcode = event.target.value;
    await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.postdirekt.de/plzserver/PlzAjaxServlet?finda=city&city=${this.zipcode}&lang=de_DE`
    )
      .then((response) => response.json())
      .then((data) => (this.allData = data.rows));
    //extracting the street names from the array in object
    this.city = this.allData[0].city;
    [...this.street] = this.allData.map((e) => e.street);
  }
  // save the selected street
  selectedStreet(event) {
    this.selectedSt = event.target.value;
    this.requestUpdate();
  }

  //getting the housnumber and show the info data
  showData(event) {
    this.houseNumber = event.target.value;
    alert(
      `Your Address is: 

      ${this.selectedSt} ${this.houseNumber},  ${this.city} ${this.zipcode},
      ${this.country} `
    );
  }

  render() {
    return html`<div class="container">
      <h2>Adresse</h2>
      <div class="form">
        <form>
          <label for="plz">PLZ</label>
          <input
            type="text"
            name="plz"
            id="plz"
            maxlength="5"
            @change=${this.getData}
          />
          <label for="city">Stadt</label>
          <input type="text" name="city" id="city" value="${this.city}" />
          <label for="street">Straße</label>
          <select
            class="citySelect"
            name="street"
            id="street"
            @change=${this.selectedStreet}
          >
            ${this.street.map(
              (streetName) => html`<option>${streetName}</option>`
            )}
          </select>
          <label for="house-number">Hausnummer</label>
          <input
            type="text"
            name="house-number"
            id="house-number"
            @change=${this.showData}
          />
          <label for="country">Land</label>
          <input
            type="text"
            name="country"
            id="country"
            value=${this.country}
            disabled
          />
          <button type="button" @click=${(e) => this.showData()}>info</button>
        </form>
      </div>
    </div>`;
  }
}

customElements.define("tech-11-zipcode", Tech11Zipcode);
