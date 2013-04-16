var jqueryNoConflict = jQuery;
var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var html = '';

function log(obj) {
    if (window.console && console.log) console.log(obj);
};

// begin main function
jqueryNoConflict(document).ready(function() {
    retriveData();
});

// grab data
function retriveData() {
    var dataSource = 'https://www.publicinsightnetwork.org/air2/public/search?a=6f4d503616e1115157a64bd26b51aec7&q=query_uuid:5bf1fe369f0e&t=JSON';
    jqueryNoConflict.getJSON(dataSource, renderDataVisualsTemplate);
};

// render data visuals template
function renderDataVisualsTemplate(data){

    var handlebarsData = {
        objects: data.results
    };

    renderHandlebarsTemplate('static-files/templates/data-details.handlebars', '#data-details', handlebarsData);
    renderHandlebarsTemplate('static-files/templates/data-visuals.handlebars', '#data-visuals', handlebarsData);
    google.maps.event.addDomListener(window, 'load', createMap(handlebarsData));
};

// create the map
function createMap(data){


    console.log(data.objects.length);


    var centerLosAngeles = new google.maps.LatLng(34.036054430724114, -118.26595796365973);
    map = new google.maps.Map(document.getElementById('content-map-canvas'), {
        center: centerLosAngeles,
        zoom: 10,
        scrollwheel: false,
        draggable: true,
        mapTypeControl: false,
        navigationControl: true,
        streetViewControl: false,
        panControl: false,
        scaleControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_TOP}
    });

    // empty array for markers
    var markers = [];
    for (var i=0; i<data.objects.length; i++) {

        var dataResults = data.objects[i];

        var latLng = new google.maps.LatLng(dataResults.primary_lat, dataResults.primary_long);

        html = '<p><strong>' + dataResults.src_first_name + ' ' + dataResults.src_last_name +
        '</strong> from ' + dataResults.primary_city + ':<br />' +
        '<ul><li><strong>' + dataResults.questions + '</strong><br />' +
        dataResults.responses + '</li></ul>' +
        '<p class="data-instructions">Submitted ' + dataResults.srs_date + '</p>';

        marker = new google.maps.Marker({
            id: i,
            html: html,
            position: latLng,
            clickable: true
        });

        markers.push(marker), bindInfoWindow(marker, map, html);
    }

    // options for marker cluster
    var markerClusterOptions = {
        gridSize: 50,
        zoomOnClick: false,
        //maxZoom: 15,
        title: 'testing title'
    };

    // adds instance of marker cluster to map
    var markerCluster = new MarkerClusterer(map, markers, markerClusterOptions);

    // click event for marker cluster
    google.maps.event.addListener(markerCluster, 'clusterclick', function(cluster){
        var content ='';

        var clickedMarkers = cluster.getMarkers();

        for (var i=0; i<clickedMarkers.length; i++) {

            if (i==0){
                var markerPosition = clickedMarkers[i];
            }

            html = clickedMarkers[i].html;
            content +=html;
        }

        infowindow.setContent(content);
        infowindow.open(map, markerPosition);
    });

};
// end






// begin function to bind the infowindow to marker
function bindInfoWindow(marker, map, html) {

    google.maps.event.addListener(marker, 'click', function() {
        jqueryNoConflict('#' + marker.id).removeClass('hidden');
        //jqueryNoConflict('#' + marker.id).addClass('currIdSelected');
        //jqueryNoConflict('#' + marker.id).addClass('hidden');


    });
};
// end





/*
// begin function to bind the infowindow to marker
function bindInfoWindow(marker, map, html) {
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(html);
        infowindow.open(map, marker);
    });
};
// end
*/