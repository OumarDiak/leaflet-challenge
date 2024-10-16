# leaflet-challenge

1. Get the data set
        * Go to the USGS GeoJSON Feed
        * Choose a data set (ex: all earthquakes from teh past 7 days)
        * Use the url from the dataset JSON to pull in the data for visualization
    2. Import and visualize the data
        * Using Leaflet create a map which plots all the earthquakes from dataset based on lat, long
        * data markers should reflect the magnitude of earthquake by the size of marker, and the depth of earthquake by the color.
            - Meaning larger magnitudes should be bigger markers, and deeper earthquakes should be darker in color
        *HINT: depth of the earth can be found as the third coordinate for each earthquicke
       * Include popups which provide additional informaiton about earthquake when marker is clicked
       * Create a legend which provides context for map data
    
Overview
This project visualizes real-time earthquake data on an interactive map using the Leaflet library. The earthquake data is sourced from the USGS GeoJSON Feed, providing all recorded earthquakes from the past week. Each earthquake is represented on the map with a circle marker that reflects both the magnitude (by the marker size) and depth (by the marker color). The map allows users to explore the data interactively, switch between different base maps, and view detailed earthquake information through popups.

Dynamic Earthquake Data: Real-time data from USGS updated every 7 days.
Magnitude Representation: Larger earthquakes have larger markers.
Depth Representation: Deeper earthquakes are visualized with darker colors.
Popups with Earthquake Details: Display the location, magnitude, depth, and time of the earthquake on marker click.
Legend: A color-coded legend helps users interpret the depth values.
Layer Control: Switch between Street Map and Topographic Map views.
