# leaflet-challenge

#Overview
This project is designed to visualise earthquake data provided by the United States Geological Survey (USGS). The USGS collects a massive amount of seismic data daily, but it lacks meaningful visualisation tools to educate the public and government organizations. This project leverages the Leaflet.js library to create an interactive map displaying earthquake information.

#Key Features
Dynamic Map Visualisation: Plot earthquakes based on their geographic location (latitude and longitude).
Data-Driven Markers:
Marker size represents earthquake magnitude.
Marker color represents earthquake depth.
Interactive Popups: Display detailed information about each earthquake (e.g., magnitude, location, depth).
Legend: A map legend provides context for interpreting marker sizes and colors.
Dataset Information
The earthquake data is fetched from the USGS GeoJSON Feed. The data updates every 5 minutes and includes various formats (e.g., earthquakes over the past day, week, or month).

#Technologies Used
JavaScript
Leaflet.js: For map visualisation and interactivity
HTML/CSS: For structuring and styling the application
GeoJSON: For earthquake data format

#Usage
Open the map and explore earthquake data.
Click on any marker to view details about the earthquake, such as magnitude, location, and depth.
Refer to the legend for understanding marker size and color representations:
Size: Larger markers = Higher magnitudes.
Color: Darker colors = Greater depth
