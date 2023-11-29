const COHORT = "2109-CPU-RM-WEB-PT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
    parties: [],
};

const partyList = document.querySelector("#parties");
const addPartyForm = document.querySelector("#partyForm");
addPartyForm.addEventListener("submit",partyForm);

// Display form input
function showInput() {
    // document.getElementById('f1').innerHTML = document.addParty.name.value;
    // document.getElementById('f2').innerHTML = document.addParty.date.value;
    // document.getElementById('f3').innerHTML = document.addParty.location.value;
    // document.getElementById("f4").innerHTML = document.addParty.description.value;
    const table = document.getElementById("allParties");
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    cell1.innerHTML = addParty.name.value;
    cell2.innerHTML = addParty.date.value;
    cell3.innerHTML = addParty.location.value;
    cell4.innerHTML = addParty.description.value;
    form.reset();
    render();
}

// Sync state with the API and rerender
async function render() {
    await getParties();
    renderParties();
}
render();

//Update state with parties from API
async function getParties() {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        state.parties = json.data;
    } catch (error) {
        console.error(error);
    }
}

// Render parties from state
function renderParties() {
    if (!state.parties.length) {
        partyList.innerHTML = "<li>No parties.</li>";
        return;
    }
    const partyCards = state.parties.map((party) => {
        const data = document.createElement("data");
        data.innerHTML = `
        <table id="api">
        <tr>
        <td>${party.name}</td>
        <td>${party.date}</td>
        <td>${party.location}</td>
        <td>${party.description}</td>
        </tr>
        </table>
        `;
        return data;
      });
      partyList.replaceChildren(...partyCards);   
}

// Ask API to create new party based on form data
async function partyForm(event) {
    event.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: addPartyForm.name.value,
          date: addPartyForm.date.value,
          location: addPartyForm.location.value,
          description: addPartyForm.description.value,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create party");
      }
      render();
    } catch (error) {
      console.error(error);
    }
}

// Delete party from list
const deleteParty = async () =>{
    const response = await fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: null
    });
    const data = await response.json();
};
deleteParty();