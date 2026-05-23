console.log("PLANIFY AI LOADED");

// ==========================================
// ELEMENTS
// ==========================================

const generateBtn =
    document.querySelector(".workspace-btn");

const textarea =
    document.querySelector(".prompt-box textarea");

const floorplanSvg =
    document.querySelector(".floorplan-svg");

const summaryTable =
    document.querySelector(".summary-table");

const plotWidthInput =
    document.querySelector("#plotWidth");

const plotHeightInput =
    document.querySelector("#plotHeight");



// ==========================================
// GENERATE BUTTON
// ==========================================

generateBtn.addEventListener("click", () => {

    // ==========================================
    // USER INPUT
    // ==========================================

    const prompt =
        textarea.value.toLowerCase();

    const plotWidth =
        Number(plotWidthInput.value);

    const plotHeight =
        Number(plotHeightInput.value);

    const plotArea =
        plotWidth * plotHeight;


    if (!plotWidth || !plotHeight) {

        alert(
            "Please enter valid plot dimensions."
        );

        return;
    }


    // ==========================================
    // CLEAR SVG
    // ==========================================

    floorplanSvg.innerHTML = "";


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
    // HOUSE DATA
    // ==========================================

    const houseData = {

        bedrooms: 1,
        bathrooms: 1,

        balcony: false,
        workspace: false,
        dining: false,

        style: "modern"
    };


    // ==========================================
    // DETECT BEDROOMS
    // ==========================================

    const bedroomMatch =
        prompt.match(/(\d+)\s*bedroom/);

    if (bedroomMatch) {

        houseData.bedrooms =
            parseInt(bedroomMatch[1]);
    }


    // ==========================================
    // DETECT BATHROOMS
    // ==========================================

    const bathroomMatch =
        prompt.match(/(\d+)\s*bathroom/);

    if (bathroomMatch) {

        houseData.bathrooms =
            parseInt(bathroomMatch[1]);
    }


    // ==========================================
    // FEATURES
    // ==========================================

    if (prompt.includes("workspace")) {

        houseData.workspace = true;
    }

    if (prompt.includes("balcony")) {

        houseData.balcony = true;
    }

    if (prompt.includes("dining")) {

        houseData.dining = true;
    }

    if (prompt.includes("luxury")) {

        houseData.style = "luxury";
    }


    // ==========================================
    // TOTAL AREA
    // ==========================================

    let totalArea = 0;


    // ==========================================
    // ROOM SIZES
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
    // ADAPTIVE SCALING
    // ==========================================

    if (plotArea >= 4000) {

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
    // LUXURY PRIORITY
    // ==========================================

    if (houseData.style === "luxury") {

        hallWidth += 4;
        hallHeight += 4;
    }


    // ==========================================
    // SVG POSITION
    // ==========================================

    let currentX = 40;
    let currentY = 40;


    // ==========================================
    // ROOM FUNCTION
    // ==========================================

    function createRoom(name, size, area) {

        totalArea += area;

        const svgNS =
            "http://www.w3.org/2000/svg";


        // RECTANGLE

        const rect =
            document.createElementNS(
                svgNS,
                "rect"
            );

  // ==========================================
// CIRCULATION & HALLWAY LOGIC
// ==========================================

let x = 60;

let y = 60;

let roomWidth = 260;

let roomHeight = 160;


// HALLWAY GAP

let hallwayGap = 40;


// ==========================================
// BEDROOMS
// ==========================================

if (name.includes("Bedroom")) {

    x = 60;

    y = 60 + (currentY * 1);

    roomWidth = 320;

    roomHeight = 160;
}


// ==========================================
// BATHROOMS
// SHARES RIGHT WALL
// ==========================================

else if (name.includes("Bathroom")) {

    x = 380;

    y = 240;

    roomWidth = 160;

    roomHeight = 160;
}


// ==========================================
// HALL
// CONNECTED BELOW
// ==========================================

else if (name === "Hall") {

    x = 60;

    y = 420 + hallwayGap;

    roomWidth = 700;

    roomHeight = 160;
}


// ==========================================
// KITCHEN
// LEFT BOTTOM
// ==========================================

else if (name === "Kitchen") {

    x = 60;

    y = 640 + hallwayGap;

    roomWidth = 350;

    roomHeight = 180;
}


// ==========================================
// DINING
// SHARES WALL WITH KITCHEN
// ==========================================

else if (name === "Dining") {

    x = 410;

    y = 640 + hallwayGap;

    roomWidth = 350;

    roomHeight = 180;
}


// ==========================================
// BALCONY
// ==========================================

else if (name === "Balcony") {

    x = 760;

    y = 380;

    roomWidth = 180;

    roomHeight = 180;
}


rect.setAttribute("x", x);

rect.setAttribute("y", y);

       rect.setAttribute(
    "width",
    roomWidth
);

rect.setAttribute(
    "height",
    roomHeight
);

        rect.setAttribute("fill", "#f8f6f2");

        rect.setAttribute("stroke", "#111827");

        rect.setAttribute("stroke-width", "2");


        // ROOM NAME

        const label =
            document.createElementNS(
                svgNS,
                "text"
            );

       label.setAttribute(
    "x",
    x + 20
);

label.setAttribute(
    "y",
    y + 40
);

        label.setAttribute(
            "font-size",
            "14"
        );

        label.setAttribute(
            "font-weight",
            "700"
        );

        label.textContent = name;


        // ROOM SIZE

        const dimensions =
            document.createElementNS(
                svgNS,
                "text"
            );

        dimensions.setAttribute(
    "x",
    x + 20
);

dimensions.setAttribute(
    "y",
    y + 80
);

        dimensions.setAttribute(
            "font-size",
            "16"
        );

        dimensions.textContent = size;


        // APPEND

        floorplanSvg.appendChild(rect);

        floorplanSvg.appendChild(label);

        floorplanSvg.appendChild(dimensions);


        // TABLE

        summaryTable.innerHTML += `
            <tr>
                <td>${name}</td>
                <td>${size}</td>
                <td>${area} sq ft</td>
            </tr>
        `;

      // MOVE ROOM LEVEL
   if (
    name.includes("Bedroom") ||
    name.includes("Bathroom")
) {

    currentY += 120;
}
        
    }


    // ==========================================
    // BEDROOMS
    // ==========================================

    for (
        let i = 1;
        i <= houseData.bedrooms;
        i++
    ) {

        const area =
            bedroomWidth * bedroomHeight;

        createRoom(
            `Bedroom ${i}`,
            `${bedroomWidth}ft × ${bedroomHeight}ft`,
            area
        );
    }


    // ==========================================
    // HALL
    // ==========================================

    const hallArea =
        hallWidth * hallHeight;

    createRoom(
        "Hall",
        `${hallWidth}ft × ${hallHeight}ft`,
        hallArea
    );


    // ==========================================
    // KITCHEN
    // ==========================================

    const kitchenArea =
        kitchenWidth * kitchenHeight;

    createRoom(
        "Kitchen",
        `${kitchenWidth}ft × ${kitchenHeight}ft`,
        kitchenArea
    );


    // ==========================================
    // BATHROOMS
    // ==========================================

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
    // WORKSPACE
    // ==========================================

    if (houseData.workspace) {

        createRoom(
            "Workspace",
            "10ft × 10ft",
            100
        );
    }


    // ==========================================
    // DINING
    // ==========================================

    if (houseData.dining) {

        createRoom(
            "Dining",
            "12ft × 14ft",
            168
        );
    }


    // ==========================================
    // BALCONY
    // ==========================================

    if (houseData.balcony) {

        createRoom(
            "Balcony",
            "8ft × 10ft",
            80
        );
    }


    // ==========================================
    // VALIDATION
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

            <td>Total Plot Area</td>

            <td>
                ${plotWidth}ft × ${plotHeight}ft
            </td>

            <td>${plotArea} sq ft</td>

        </tr>

        <tr class="total-row">

            <td>Used Space</td>

            <td>-</td>

            <td>${totalArea} sq ft</td>

        </tr>

        <tr class="total-row">

            <td>Remaining Space</td>

            <td>-</td>

            <td>${remainingSpace} sq ft</td>

        </tr>
    `;
});