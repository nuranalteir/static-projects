var jqueryNoConflict = jQuery;
var fn = fn || {};

var timelineDataSource = 'spreadsheet';
var timelineDataSourceKey = '0Aq8qwSArzKP9dHlsT1BsSmZ0MXhRcVBVUkJVRWpZWkE';

// example is static-files/data/moments-in-giants-godgers-rivalry_timeline.json
var timelineDataSourceFile = '';

jqueryNoConflict(document).ready(function() {
    fn.displayTimelineFromData(timelineDataSource)
    fn.retrieveTabletopData();
});

// begin data configuration object
var fn = {

    displayTimelineFromData: function(source){
        if (source === 'spreadsheet'){
            fn.timelineFromSpreadsheet();
        } else if (source === 'flat-file'){
            fn.timelineFromFlatfile();
        } else {
            fn.timelineFromSpreadsheet();
        }
    },

    retrieveTabletopData: function(){
        Tabletop.init({
            key: timelineDataSourceKey,
            callback: fn.displayData,
            simpleSheet: false
        });
    },

    displayData: function(data, tabletop){

        var handlebarsData = {
            objects: data.MetaData.elements
        };

        fn.embedUrl.pathToTimeline = data.MetaData.elements[0].url;
        renderHandlebarsTemplate('static-files/templates/data-share.handlebars', '#data-share', handlebarsData);
        renderHandlebarsTemplate('static-files/templates/data-details.handlebars', '#data-details', handlebarsData);
        renderHandlebarsTemplate('static-files/templates/data-footer.handlebars', '#data-footer', handlebarsData);
    },

    timelineFromSpreadsheet: function(){

        jqueryNoConflict('#data-visuals').verticalTimeline({

            // spreadsheet key
            key: timelineDataSourceKey,

            // name of sheet on spreadsheet
            sheetName: 'Posts',

            // newest or oldest
            defaultDirection: 'oldest',

            // collapsed or expanded
            defaultExpansion: 'expanded',

            // groupSegmentByYear or groupSegmentByDecade
            groupFunction: 'groupSegmentByYear',

            // adjust timeline width
            width: '75%'
        });
    },

    timelineFromFlatfile: function(){

        jqueryNoConflict.getJSON('static-files/data/moments-in-giants-godgers-rivalry_timeline.json', function(data) {
            $('#data-visuals').verticalTimeline({

                data: data,

                // newest or oldest
                defaultDirection: 'oldest',

                // collapsed or expanded
                defaultExpansion: 'expanded',

                // groupSegmentByYear or groupSegmentByDecade
                groupFunction: 'groupSegmentByYear',

                // adjust timeline width
                width: '75%'

            });
        });
    },

    embedUrl: {
        pathToTimeline: null
    },

    embedBox: function(){
        var embed_url = fn.embedUrl.pathToTimeline + 'iframe.html';
        jAlert('<h4>Embed this on your site or blog</h4>' + '<span>Copy the code below and paste to source of your page: <br /><br /> &lt;iframe src=\"'+ embed_url +'\" width=\"100%\" height=\"850px\" style=\"margin: 0 auto;\" frameborder=\"no\"&gt;&lt;/iframe>', 'Share or Embed');
    }
}