let myMap = L.map("map").setView([40.86,-120.102], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(myMap);

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


d3.json(url).then(function(response) {
    L.geoJson()
    features = response.features;
    let marker_limit = features.length;

    for (let i = 0; i < marker_limit; i++) {
        let location = features[i].geometry;
        let magnitude = features[i].properties.mag;
        let depth = location.coordinates[2];

        if (depth < 10) {
            color = "lime";
        } else if (depth < 30) {
            color = "green";
        } else if (depth < 50) {
            color = "yellow";
        } else if (depth < 70) {
            color = "orange";
        } else if (depth < 90) {
            color = "pink";
        } else {
            color = "red"
        }
        

        if(location) {
            L.circle([location.coordinates[1], location.coordinates[0]], {
            color: "white",
            fillColor: color,
            fillOpacity: 0.5,
            radius: magnitude * 25000}).addTo(myMap)
        }
}});