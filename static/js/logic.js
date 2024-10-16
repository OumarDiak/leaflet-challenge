queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the queryUrl/
d3.json(queryUrl).then(function (data) {
    // createFeatures function on data.features object from the response
    createFeatures(data.features);
});

// create function to choose color for circle
function chooseColor(depth) {
  let color = "";
  if (depth >= 90) {
      color = "#fc4653";
  }
  else if (depth >= 70) {
      color = "#f9914b";
  }
  else if (depth >= 50) {
      color = "#faa921";
  }
  else if (depth >= 30) {
      color = "#f4d612";
  }
  else if (depth >= 10) {
      color = "#d5f70a";
  }
  else {
      color = "#96f909";
  }

  return color;
};

// create the function createFeatures()
function createFeatures(earthquakeData) {

  // use data from each faeture to create a an earthquake
  for (let i = 0; i < earthquakeData.length; i++) {
    let earthquake = earthquakeData[i];
    let geo = earthquake.geometry;
    let location = [geo.coordinates[1], geo.coordinates[0]];
    let depth = geo.coordinates[2];

    // conditionals for feature marker color
    // NOTE: used the MAC Digital Color Meter to obtain correct RGB color from example, and then converted to hex
    let color = chooseColor(depth);
 
    //add circles to the map
    L.circle(location, {
      fillColor: color,
        fillOpacity: 0.9,
        color: "Black",
        weight: 0.5,
        //adjust radius,
        radius: (earthquake.properties.mag) * 20000
    }).bindPopup(`<h3>${earthquake.properties.place}</h3><hr><p>Magnitude: ${earthquake.properties.mag}</p><p>Depth: ${depth} km</p>`).addTo(myMap); 
  };
};

// Create the base layers.
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create a baseMaps object.
let baseMaps = {
  "Street Map": street,
  "Topographic Map": topo
};

// Create an overlay object to hold our overlay.
// let overlayMaps = {
//   Earthquakes: earthquakes
// };

// Create our map, giving it the streetmap and earthquakes layers to display on load.
let myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5,
  layers: [street]
});


// Create a layer control.
// Pass it our baseMaps and overlayMaps.
// Add the layer control to the map.
L.control.layers(baseMaps).addTo(myMap);


// Create a legend
let color_legend = L.control({
  position: "bottomright"
});


// use .onAdd() methond to add the color_legend to the map
color_legend.onAdd = function () {
  let div = L.DomUtil.create("div", "depth_legend");
  let depth_colors = ["#96F909", "#D5F70A", "#F4D612", "#FAA921", "#F9914B", "#FC4653"];
  let depth_labels = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"]

  //Update the legend to include the desired color squares and information
  div.innerHTML =
    `<h3> Depth (km)</h3>
    <div class='depth_info'>
      <input type='text' value=${depth_labels[0]} />
      <div class='depth_color' style='background-color: ${depth_colors[0]};'></div>
    </div>
    <div class='depth_info'>
      <input type='text' value=${depth_labels[1]} />
      <div class='depth_color' style='background-color: ${depth_colors[1]};'></div>
    </div>
    <div class='depth_info'>
      <input type='text' value=${depth_labels[2]} />
      <div class='depth_color' style='background-color: ${depth_colors[2]};'></div>
    </div>
    <div class='depth_info'>
      <input type='text' value=${depth_labels[3]} />
      <div class='depth_color' style='background-color: ${depth_colors[3]};'></div>
    </div>
    <div class='depth_info'>
      <input type='text' value=${depth_labels[4]} />
      <div class='depth_color' style='background-color: ${depth_colors[4]};'></div>
    </div>
    <div class='depth_info'>
      <input type='text' value=${depth_labels[5]} />
      <div class='depth_color' style='background-color: ${depth_colors[5]};'></div>
    </div>`
 
  return div;
};
color_legend.addTo(myMap);