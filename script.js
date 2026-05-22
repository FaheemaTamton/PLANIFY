console.log("PLANIFY AI LOADED");

// ==========================================
// ELEMENTS
// ==========================================

const generateBtn = document.querySelector(".workspace-btn");

const textarea = document.querySelector(".prompt-box textarea");

const planArea = document.querySelector(".plan-area");

const summaryTable = document.querySelector(".summary-table");


generateBtn.addEventListener("click", () => {

    // ==========================================
    // USER PROMPT
    // ==========================================

    const prompt = textarea.value.toLowerCase();



    // ==========================================
    // HOUSE DATA OBJECT
    // ==========================================

    const houseData = {

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
    // BEDROOM DETECTION
    // ==========================================

    const bedroomMatch = prompt.match(/(\d+)\s*bedroom/);

    if (bedroomMatch) {

        houseData.bedrooms = parseInt(bedroomMatch[1]);
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
    // SHOW EXTRACTED DATA
    // ==========================================

    console.log(houseData);



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
    // CREATE BEDROOMS
    // ==========================================

    for (let i = 1; i <= houseData.bedrooms; i++) {

        createRoom(
            `Bedroom ${i}`,
            "14ft × 16ft",
            224
        );
    }



    // ==========================================
    // DEFAULT ROOMS
    // ==========================================

    createRoom("Hall", "18ft × 20ft", 360);

    createRoom("Kitchen", "10ft × 12ft", 120);

    createRoom("Bathroom", "6ft × 8ft", 48);



    // ==========================================
    // OPTIONAL FEATURES
    // ==========================================

    if (houseData.workspace) {

        createRoom(
            "Workspace",
            "10ft × 10ft",
            100
        );
    }


    if (houseData.dining) {

        createRoom(
            "Dining",
            "12ft × 14ft",
            168
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
    // TOTAL ROW
    // ==========================================

    summaryTable.innerHTML += `
        <tr class="total-row">

            <td>
                Total Plot Area
            </td>

            <td>
                60ft × 40ft
            </td>

            <td>
                ${totalArea} sq ft
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


        room.innerHTML = `
            ${name}

            <span>${size}</span>

            <small>${area} sq ft</small>
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

generateBtn.addEventListener("click", () => {

    // ==========================================
    // USER PROMPT
    // ==========================================

    const prompt = textarea.value.toLowerCase();



    // ==========================================
    // HOUSE DATA OBJECT
    // ==========================================

    const houseData = {

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
    // BEDROOM DETECTION
    // ==========================================

    const bedroomMatch = prompt.match(/(\d+)\s*bedroom/);

    if (bedroomMatch) {

        houseData.bedrooms = parseInt(bedroomMatch[1]);
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
    // SHOW EXTRACTED DATA
    // ==========================================

    console.log(houseData);



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
    // CREATE BEDROOMS
    // ==========================================

    for (let i = 1; i <= houseData.bedrooms; i++) {

        createRoom(
            `Bedroom ${i}`,
            "14ft × 16ft",
            224
        );
    }



    // ==========================================
    // DEFAULT ROOMS
    // ==========================================

    createRoom("Hall", "18ft × 20ft", 360);

    createRoom("Kitchen", "10ft × 12ft", 120);

    createRoom("Bathroom", "6ft × 8ft", 48);



    // ==========================================
    // OPTIONAL FEATURES
    // ==========================================

    if (houseData.workspace) {

        createRoom(
            "Workspace",
            "10ft × 10ft",
            100
        );
    }


    if (houseData.dining) {

        createRoom(
            "Dining",
            "12ft × 14ft",
            168
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
    // TOTAL ROW
    // ==========================================

    summaryTable.innerHTML += `
        <tr class="total-row">

            <td>
                Total Plot Area
            </td>

            <td>
                60ft × 40ft
            </td>

            <td>
                ${totalArea} sq ft
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


        room.innerHTML = `
            ${name}

            <span>${size}</span>

            <small>${area} sq ft</small>
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