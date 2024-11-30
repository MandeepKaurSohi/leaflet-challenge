//creating the map object. https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
let createMap = L.map("map",{
    center: [69.0359,-145.6074],
    zoom: 7
});

//Adding the tilelayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(createMap);

//store the API query variable 
let baseurl =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

//add a limit
//let limit = "&$limit=1000";

//assemble the API query URL
//let url = baseurl + limit;

//get the data with d3
d3.json(baseurl).then(function(data){
    //console.log(data);

 // Define a function to style the markers
 function styleInfo(feature) {
    return {
        radius: getRadius(feature.properties.mag),
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
}

// Function to determine marker size based on magnitude
function getRadius(magnitude) {
    return magnitude ? magnitude * 4 : 1; // Default size if magnitude is missing
}

// Function to determine marker color based on depth
function getColor(depth) {
    return depth > 90 ? '#d73027' :
           depth > 70 ? '#fc8d59' :
           depth > 50 ? '#fee08b' :
           depth > 30 ? '#d9ef8b' :
           depth > 10 ? '#91cf60' :
                        '#1a9850';
}

// Add GeoJSON layer with circle markers
L.geoJSON(data, {
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, styleInfo(feature));
    },
    onEachFeature: function(feature, layer) {
        // Add a popup with details for each marker
        layer.bindPopup(
            `<h3>${feature.properties.place}</h3>
             <p>Magnitude: ${feature.properties.mag}</p>
             <p>Depth: ${feature.geometry.coordinates[2]} km</p>`
        );
    }
}).addTo(createMap);

 // Add a legend to the map
 let legend = L.control({ position: "bottomright" });
 legend.onAdd = function() {
     let div = L.DomUtil.create('div', 'legend');
     let depths = [0, 10, 30, 50, 70, 90]; // Depth ranges
     let colors = ['#1a9850', '#91cf60', '#d9ef8b', '#fee08b', '#fc8d59', '#d73027']; // Corresponding colors

     div.innerHTML = `<h4>Depth (km)</h4>`;
     // Loop through depth intervals and generate a label with a colored square for each range
     for (let i = 0; i < depths.length; i++) {
         div.innerHTML +=
             `<i style="background: ${colors[i]}; width: 18px; height: 18px; display: inline-block; margin-right: 8px;"></i>` +
             `${depths[i]}${depths[i + 1] ? '&ndash;' + depths[i + 1] : '+'}<br>`;
     }
     return div;
 };
 legend.addTo(createMap);
});

