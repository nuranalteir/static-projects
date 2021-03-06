var jqueryNoConflict = jQuery;
var initializeTemplates = initializeTemplates || {};
var fn = fn || {};
var embed_url_root = 'http://projects.scpr.org/static/maps/following-la-aqueduct';

// begin main function
jqueryNoConflict(document).ready(function() {
    initializeTemplates.renderStaticTemplates();
    fn.checkForDataVisuals();
    fn.dismissContentBackground();
});

// begin data configuration object
var fn = {

    checkForDataVisuals: function(){
        var checkExist = setInterval(function() {
            if (jqueryNoConflict('.data-visuals').length) {
                clearInterval(checkExist);
                fn.createMap();
            }
        }, 1000);
    },

    createMap: function(){

        var initialZoom;

        // set zoom for mobile devices
        if (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)) {
            initialZoom = 7;
        } else {
            initialZoom = 8;
        }

        map = new L.map('content-map-canvas', {
            scrollWheelZoom: false,
            zoomControl: true
        });

        var center = new L.LatLng(35.995785,-117.944584);
        map.setView(center, initialZoom);

        var mapquestUrl = L.tileLayer('http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
             attribution: 'Tiles, data, imagery and map information provided by <a href="http://www.mapquest.com" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">, <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> and contributors.',
             subdomains: ['otile1','otile2','otile3','otile4']
        });

        map.addLayer(mapquestUrl);

        L.geoJson(aqueductRoute, {
            style: function (feature) {
                var route_color;
                if (feature.properties.type_ === 'la_aqueduct'){
                    route_color = '#CA0020';
                } else if (feature.properties.type_ === 'mono_basin_extension'){
                    route_color = '#5E3C99';
                } else if (feature.properties.type_ === 'second_aqueduct'){
                    route_color = '#404040';
                } else {
                    route_color = '#2B83BA';
                }
                return {
                    color: route_color,
                    weight: 7,
                    fillColor: '#f07a30',
                    opacity: 1,
                    fillOpacity: 1
                }
            }
        }).addTo(map);

        var myIcon = L.Icon.extend({
            iconUrl: 'images/camera.png',
            iconSize: [38, 95],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76]
        });

        L.geoJson(aqueductFeatures, {
            style: function (feature) {
                return {
                    color: 'black',
                    weight: 5,
                    fillColor: '#f07a30',
                    opacity: .6,
                    fillOpacity: 1
                }
            },

            pointToLayer: function(feature, latlng) {
                return new L.marker(latlng, {
                    icon: new myIcon({
                        iconUrl: 'images/camera.png'
                    })
                })
            },

            onEachFeature: function(feature, layer) {
                layer.on('click', function (e) {
                    if (feature.properties.imageUrl === null){
                        var imageUrl = 'http://maps.googleapis.com/maps/api/staticmap?center=' +
                            feature.geometry.coordinates[1] + ',' + feature.geometry.coordinates[0] +
                            '&zoom=13&size=1000x1000&maptype=satellite&sensor=false&key=AIzaSyAtS1OYyuRY0inb23BK0nuGId3FiOC6Rb8';
                        var imageCredit = 'Satellite image via Google'

                    } else {
                        var imageUrl = feature.properties.imageUrl;
                        var imageCredit = '<strong>Photo by</strong> ' + feature.properties.imageCredit;
                    }

                    var html = "<h4>" + feature.properties.name + "</h4><img class='img-responsive' src='" + imageUrl + "' /><p>" + imageCredit + "</p>";
                    jqueryNoConflict('#content-background').css({'opacity' : '0.7'}).fadeIn('fast');
                    jqueryNoConflict('#content-display').html('<p style=\"float: right\" id=\"close\"><strong>[X]</strong></p>' + html).fadeIn('slow');

                    jqueryNoConflict('#close').click(function(){
                        jqueryNoConflict('#content-display').fadeOut('fast');
                        jqueryNoConflict('#content-background').fadeOut('fast');
                    });

                });
            }

        }).addTo(map);
    },

    dismissContentBackground: function(){
    	jqueryNoConflict('#content-background').click(function(){
    		jqueryNoConflict('#content-background').fadeOut('slow');
    		jqueryNoConflict('#content-display').fadeOut('slow');
    	});

    	jqueryNoConflict(document).keydown(function(e){
    		if(e.keyCode==27) {
    			jqueryNoConflict('#content-background').fadeOut('slow');
    			jqueryNoConflict('#content-display').fadeOut('slow');
    		}
    	});
    }
}
// end data configuration object

// begin template rendering object
var initializeTemplates = {
    renderStaticTemplates: function(){
        var proxyPrefix = 'http://projects.scpr.org/static/static-files/v3-dependencies/templates/';
        renderHandlebarsTemplate(proxyPrefix + 'kpcc-header.handlebars', '.kpcc-header');
        renderHandlebarsTemplate(proxyPrefix + 'kpcc-footer.handlebars', '.kpcc-footer');
        renderHandlebarsTemplate('templates/data-share.handlebars', '.data-share');
        renderHandlebarsTemplate('templates/data-details.handlebars', '.data-details');
        renderHandlebarsTemplate('templates/data-visuals.handlebars', '.data-visuals');

        var checkExist = setInterval(function() {
            if (jqueryNoConflict('.buttons').length) {
                clearInterval(checkExist);
                initializeTemplates.toggleDisplayIcon();
            }
        }, 1000);

    },

    renderEmbedBox: function(){
        var embed_url = embed_url_root + '/iframe.html';
        jAlert('<h4>Embed this on your site or blog</h4>' + '<span>Copy this code and paste to source of your page: <br /><br /> &lt;iframe src=\"'+ embed_url +'\" width=\"100%\" height=\"850px\" style=\"margin: 0 auto;\" frameborder=\"no\"&gt;&lt;/iframe>', 'Share or Embed');
    },

    toggleDisplayIcon: function(){
        jqueryNoConflict('.text').on('shown.bs.collapse', function(){
            jqueryNoConflict('span.text').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        });
        jqueryNoConflict('.text').on('hidden.bs.collapse', function(){
            jqueryNoConflict('span.text').addClass('glyphicon-chevron-down').removeClass('glyphicon-chevron-up');
        });
        jqueryNoConflict('.about').on('shown.bs.collapse', function(){
            jqueryNoConflict('span.about').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        });
        jqueryNoConflict('.about').on('hidden.bs.collapse', function(){
            jqueryNoConflict('span.about').addClass('glyphicon-chevron-down').removeClass('glyphicon-chevron-up');
        });
    }
}
// end template rendering object