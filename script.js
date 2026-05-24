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
// SMART POSITION TRACKERS
// ==========================================

let bedroomY = 60;

let hallY = 0;

let kitchenY = 0;


    // ==========================================
    // ROOM FUNCTION
    // ==========================================

    function createRoom(name, size, area) {

        totalArea += area;

        const svgNS =
            "http://www.w3.org/2000/svg";

            // ==========================================
// REALISTIC FLOORPLAN REFINEMENT
// ==========================================

let x = 60;

let y = 60;

// ==========================================
// DYNAMIC ADAPTIVE SCALING
// ==========================================

const plotWidth =
    Number(
        document.getElementById("plotWidth").value
    ) || 40;

const plotHeight =
    Number(
        document.getElementById("plotHeight").value
    ) || 60;


// SCALE FACTOR

const scaleFactor =
    Math.min(
        plotWidth,
        plotHeight
    ) / 40;


// DEFAULT ROOM SIZE

let roomWidth =
    220 * scaleFactor;

let roomHeight =
    130 * scaleFactor;





        // RECTANGLE

        const rect =
            document.createElementNS(
                svgNS,
                "rect"
            );



// ==========================================
// BEDROOMS
// ==========================================

if (name.includes("Bedroom")) {

    x = 80;

    y = bedroomY;

    roomWidth =
        240 * scaleFactor;

    roomHeight =
        140 * scaleFactor;

    bedroomY += roomHeight - 10;
}

// ==========================================
// BATHROOMS
// SHARES RIGHT WALL
// ==========================================

else if (name.includes("Bathroom")) {

    x = 300;

    y = bedroomY - 110;

    roomWidth =
        110 * scaleFactor;

    roomHeight =
        100 * scaleFactor;
}


// ==========================================
// HALL
// CONNECTED BELOW
// ==========================================

else if (name === "Hall") {

    x = 80;

    y = bedroomY + 10;

    roomWidth =
        380 * scaleFactor;

    roomHeight =
        170 * scaleFactor;

    hallY = y;
}


// ==========================================
// KITCHEN
// LEFT BOTTOM
// ==========================================

else if (name === "Kitchen") {

    x = 80;

    y = hallY + roomHeight - 10;

    roomWidth =
        200 * scaleFactor;

    roomHeight =
        120 * scaleFactor;

    kitchenY = y;
}


// ==========================================
// DINING
// SHARES WALL WITH KITCHEN
// ==========================================

else if (name === "Dining") {

    x = 290;


    y = kitchenY;

    roomWidth =
        200 * scaleFactor;

    roomHeight =
        120 * scaleFactor;
}      


// ==========================================
// BALCONY
// ==========================================

else if (name === "Balcony") {

    x =
        470 * scaleFactor;

    y =
        hallY + 30;

    roomWidth =
        140 * scaleFactor;

    roomHeight =
        110 * scaleFactor;
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
            "12"
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
            "13"
        );

        dimensions.textContent = size;


        // APPEND

        floorplanSvg.appendChild(rect);

        // ==========================================
// DOOR SYSTEM
// ==========================================

const door =
    document.createElementNS(
        svgNS,
        "line"
    );


// BEDROOM DOOR

if (name.includes("Bedroom")) {

    door.setAttribute(
        "x1",
        x + roomWidth - 40
    );

    door.setAttribute(
        "y1",
        y + roomHeight
    );

    door.setAttribute(
        "x2",
        x + roomWidth - 10
    );

    door.setAttribute(
        "y2",
        y + roomHeight
    );
}


// BATHROOM DOOR

else if (name.includes("Bathroom")) {

    door.setAttribute(
        "x1",
        x
    );

    door.setAttribute(
        "y1",
        y + 40
    );

    door.setAttribute(
        "x2",
        x
    );

    door.setAttribute(
        "y2",
        y + 80
    );
}


// HALL OPENING

else if (name === "Hall") {

    door.setAttribute(
        "x1",
        x + 260
    );

    door.setAttribute(
        "y1",
        y
    );

    door.setAttribute(
        "x2",
        x + 340
    );

    door.setAttribute(
        "y2",
        y
    );
}


// KITCHEN DOOR

else if (name === "Kitchen") {

    door.setAttribute(
        "x1",
        x + roomWidth
    );

    door.setAttribute(
        "y1",
        y + 60
    );

    door.setAttribute(
        "x2",
        x + roomWidth
    );

    door.setAttribute(
        "y2",
        y + 100
    );
}


// DINING OPENING

else if (name === "Dining") {

    door.setAttribute(
        "x1",
        x
    );

    door.setAttribute(
        "y1",
        y + 50
    );

    door.setAttribute(
        "x2",
        x
    );

    door.setAttribute(
        "y2",
        y + 90
    );
    
}


// DOOR STYLE

door.setAttribute(
    "stroke",
    "#2563EB"
);

door.setAttribute(
    "stroke-width",
    "4"
);

door.setAttribute(
    "stroke-linecap",
    "round"
);


floorplanSvg.appendChild(door);

// ==========================================
// WINDOW SYSTEM
// ==========================================

const windowLine =
    document.createElementNS(
        svgNS,
        "line"
    );


// BEDROOM WINDOWS

if (name.includes("Bedroom")) {

    windowLine.setAttribute(
        "x1",
        x + 80
    );

    windowLine.setAttribute(
        "y1",
        y
    );

    windowLine.setAttribute(
        "x2",
        x + 180
    );

    windowLine.setAttribute(
        "y2",
        y
    );
}


// HALL WINDOWS

else if (name === "Hall") {

    windowLine.setAttribute(
        "x1",
        x + 500
    );

    windowLine.setAttribute(
        "y1",
        y + roomHeight
    );

    windowLine.setAttribute(
        "x2",
        x + 580
    );

    windowLine.setAttribute(
        "y2",
        y + roomHeight
    );
}


// KITCHEN WINDOW

else if (name === "Kitchen") {

    windowLine.setAttribute(
        "x1",
        x
    );

    windowLine.setAttribute(
        "y1",
        y + 50
    );

    windowLine.setAttribute(
        "x2",
        x
    );

    windowLine.setAttribute(
        "y2",
        y + 100
    );
}


// DINING WINDOW

else if (name === "Dining") {

    windowLine.setAttribute(
        "x1",
        x + roomWidth
    );

    windowLine.setAttribute(
        "y1",
        y + 40
    );

    windowLine.setAttribute(
        "x2",
        x + roomWidth
    );

    windowLine.setAttribute(
        "y2",
        y + 90
    );
}


// WINDOW STYLE

windowLine.setAttribute(
    "stroke",
    "#06B6D4"
);

windowLine.setAttribute(
    "stroke-width",
    "5"
);

windowLine.setAttribute(
    "stroke-linecap",
    "round"
);


floorplanSvg.appendChild(windowLine);

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