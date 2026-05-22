console.log("PLANIFY AI LOADED");

// ==========================================
// ELEMENTS
// ==========================================

const generateBtn = document.querySelector(".workspace-btn");

const textarea = document.querySelector(".prompt-box textarea");

const planArea = document.querySelector(".plan-area");

const summaryTable = document.querySelector(".summary-table");

const plotWidthInput = document.querySelector("#plotWidth");

const plotHeightInput = document.querySelector("#plotHeight");
 

generateBtn.addEventListener("click", () => {

    // ==========================================
    // USER PROMPT
    // ==========================================

    const prompt = textarea.value.toLowerCase();
    const plotWidth = Number(plotWidthInput.value);
    const plotHeight = Number(plotHeightInput.value);
    const plotArea = plotWidth * plotHeight;

    if (!plotWidth || !plotHeight) {

    alert("Please enter valid plot dimensions.");

    return;
}



    // ==========================================
    // HOUSE DATA OBJECT
    // ==========================================

    const houseData = {

        bathrooms: 1,
        bedrooms: 1,
        style: "modern",

        balcony: false,
        parking: false,
        workspace: false,
        garden: false,
        dining: false,

        lighting: false,
        openLayout: false
    };

    // ==========================================
// ROOM RELATIONSHIPS
// ==========================================

const roomRelationships = {

    Kitchen: ["Dining", "Hall"],

    Dining: ["Kitchen", "Hall"],

    Bathroom: ["Bedroom"],

    Balcony: ["Hall"],

    Workspace: ["Bedroom"],

    Hall: ["All Rooms"]
};



    // ==========================================
    // BEDROOM DETECTION
    // ==========================================

    const bedroomMatch = prompt.match(/(\d+)\s*bedroom/);

    if (bedroomMatch) {

        houseData.bedrooms = parseInt(bedroomMatch[1]);
    }

    // ==========================================
// BATHROOM DETECTION
// ==========================================

const bathroomMatch =
    prompt.match(/(\d+)\s*bathroom/);

if (bathroomMatch) {

    houseData.bathrooms =
        parseInt(bathroomMatch[1]);
}



    // ==========================================
    // STYLE DETECTION
    // ==========================================

    if (prompt.includes("modern")) {

        houseData.style = "modern";
    }

    else if (prompt.includes("luxury")) {

        houseData.style = "luxury";
    }

    else if (prompt.includes("traditional")) {

        houseData.style = "traditional";
    }

    else if (prompt.includes("minimal")) {

        houseData.style = "minimalist";
    }



    // ==========================================
    // FEATURE DETECTION
    // ==========================================

    if (prompt.includes("balcony")) {

        houseData.balcony = true;
    }

    if (prompt.includes("parking")) {

        houseData.parking = true;
    }

    if (prompt.includes("workspace")) {

        houseData.workspace = true;
    }

    if (prompt.includes("garden")) {

        houseData.garden = true;
    }

    if (prompt.includes("dining")) {

        houseData.dining = true;
    }

    if (
        prompt.includes("natural lighting") ||
        prompt.includes("sunlight")
    ) {

        houseData.lighting = true;
    }

    if (
        prompt.includes("open layout") ||
        prompt.includes("open space")
    ) {

        houseData.openLayout = true;
    }

// ==========================================
// PRIORITY MULTIPLIERS
// ==========================================

let hallMultiplier = 1;

let workspaceMultiplier = 1;

let diningMultiplier = 1;



    // ==========================================
// ROOM PRIORITIES
// ==========================================

if (
    houseData.style === "luxury"
) {

    hallMultiplier = 1.4;
}


if (
    houseData.workspace
) {

    workspaceMultiplier = 1.5;
}


if (
    houseData.dining
) {

    diningMultiplier = 1.3;
}


    // ==========================================
    // SHOW EXTRACTED DATA
    // ==========================================

    console.log(houseData);
    console.log(roomRelationships);


    // ==========================================
    // CLEAR OLD PLAN
    // ==========================================

    planArea.innerHTML = "";



    // ==========================================
    // CLEAR TABLE
    // ==========================================

    summaryTable.innerHTML = `
        <tr>
            <th>Room</th>
            <th>Dimensions</th>
            <th>Area</th>
        </tr>
    `;



    // ==========================================
    // TOTAL AREA
    // ==========================================

    let totalArea = 0;
    // ==========================================
// ROOM SIZE VARIABLES
// ==========================================

let bedroomWidth = 12;
let bedroomHeight = 14;

let hallWidth = 16;
let hallHeight = 18;

let kitchenWidth = 10;
let kitchenHeight = 12;

let bathroomWidth = 6;
let bathroomHeight = 8;



// ==========================================
// ADAPTIVE ROOM SCALING
// ==========================================

if (plotArea >= 4000) {

    // LARGE HOUSE

    bedroomWidth = 16;
    bedroomHeight = 18;

    hallWidth = 22;
    hallHeight = 24;

    kitchenWidth = 14;
    kitchenHeight = 16;

    bathroomWidth = 8;
    bathroomHeight = 10;
}


else if (plotArea <= 1500) {

    // SMALL HOUSE

    bedroomWidth = 10;
    bedroomHeight = 12;

    hallWidth = 14;
    hallHeight = 16;

    kitchenWidth = 8;
    kitchenHeight = 10;

    bathroomWidth = 5;
    bathroomHeight = 7;
}



    // ==========================================
    // CREATE BEDROOMS
    // ==========================================

    for (let i = 1; i <= houseData.bedrooms; i++) {

        const bedroomArea =
    bedroomWidth * bedroomHeight;

createRoom(
    `Bedroom ${i}`,
    `${bedroomWidth}ft × ${bedroomHeight}ft`,
    bedroomArea
);
    }



    // ==========================================
    // DEFAULT ROOMS
    // ==========================================

hallWidth =
    Math.floor(
        hallWidth * hallMultiplier
    );

hallHeight =
    Math.floor(
        hallHeight * hallMultiplier
    );

const hallArea =
    hallWidth * hallHeight;

createRoom(
    "Hall",
    `${hallWidth}ft × ${hallHeight}ft`,
    hallArea
);
const kitchenArea =
    kitchenWidth * kitchenHeight;

createRoom(
    "Kitchen",
    `${kitchenWidth}ft × ${kitchenHeight}ft`,
    kitchenArea
);

const bathroomArea =
    bathroomWidth * bathroomHeight;


for (
    let i = 1;
    i <= houseData.bathrooms;
    i++
) {

    createRoom(
        `Bathroom ${i}`,
        `${bathroomWidth}ft × ${bathroomHeight}ft`,
        bathroomArea
    );
}



    // ==========================================
    // OPTIONAL FEATURES
    // ==========================================

    if (houseData.workspace) {

        const workspaceWidth =
    Math.floor(10 * workspaceMultiplier);

const workspaceHeight =
    Math.floor(10 * workspaceMultiplier);

const workspaceArea =
    workspaceWidth * workspaceHeight;

createRoom(
    "Workspace",
    `${workspaceWidth}ft × ${workspaceHeight}ft`,
    workspaceArea
);
    }


    if (houseData.dining) {

        const diningWidth =
    Math.floor(12 * diningMultiplier);

const diningHeight =
    Math.floor(14 * diningMultiplier);

const diningArea =
    diningWidth * diningHeight;

createRoom(
    "Dining",
    `${diningWidth}ft × ${diningHeight}ft`,
    diningArea
);
    }


    if (houseData.balcony) {

        createRoom(
            "Balcony",
            "8ft × 10ft",
            80
        );
    }



// ==========================================
// VALIDATE SPACE
// ==========================================

const remainingSpace =
    plotArea - totalArea;


if (totalArea > plotArea) {

    alert(
        "Rooms exceed available plot area!"
    );
}





    // ==========================================
    // TOTAL ROW
    // ==========================================

    summaryTable.innerHTML += `

    <tr class="total-row">

        <td>
            Total Plot Area
        </td>

        <td>
            ${plotWidth}ft × ${plotHeight}ft
        </td>

        <td>
            ${plotArea} sq ft
        </td>

    </tr>


    <tr class="total-row">

        <td>
            Used Space
        </td>

        <td>
            -
        </td>

        <td>
            ${totalArea} sq ft
        </td>

    </tr>


    <tr class="total-row">

        <td>
            Remaining Space
        </td>

        <td>
            -
        </td>

        <td>
            ${remainingSpace} sq ft
        </td>

    </tr>

`;





    // ==========================================
    // ROOM FUNCTION
    // ==========================================

    function createRoom(name, size, area) {

        totalArea += area;


        const room = document.createElement("div");

        room.classList.add("room");

       const relations =
    roomRelationships[name];

room.innerHTML = `
    ${name}

    <span>${size}</span>

    <small>${area} sq ft</small>

    ${
        relations
        ?
        `<p>Near: ${relations.join(", ")}</p>`
        :
        ""
    }
`;


        planArea.appendChild(room);



        summaryTable.innerHTML += `
            <tr>

                <td>${name}</td>

                <td>${size}</td>

                <td>${area} sq ft</td>

            </tr>
        `;
    }

});

