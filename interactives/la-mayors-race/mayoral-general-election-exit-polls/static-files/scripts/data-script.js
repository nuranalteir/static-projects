    var jqueryNoConflict = jQuery;

    // pull data from spreadsheet onload
    jqueryNoConflict(document).ready(function(){
        startProcessingTheData()
    });

    // scroll into view function
    function scrollToTopic(){
        var exitPollTopic = jqueryNoConflict('#search-exit-polling-topics').val();
        jqueryNoConflict.scrollTo(exitPollTopic)
    }

    function startProcessingTheData(){
        processGenderData();
        processGeographyData();
        processHousingData();
        processMilitaryData();

        //Calculate the height of <header>
        //Use outerHeight() instead of height() if have padding
        var aboveHeight = $('header').outerHeight();

        // when scroll
        $(window).scroll(function(){

        	//if scrolled down more than the header's height
            if ($(window).scrollTop() > aboveHeight){

        		// if yes, add "fixed" class to the <nav>
        		// add padding top to the #content (value is same as the height of the nav)
                $('nav').addClass('fixed').css('top','100').next().css('padding-top','60px');
            } else {

        		// when scroll up or less than aboveHeight, remove the "fixed" class, and the padding-top
                $('nav').removeClass('fixed').next().css('padding-top','0');
            }
        });

    }

    // display data from tabletop
    function processGenderData(){

        var femaleNumbers = {
            name: 'Female Vote',
            color: '#005873',
            type: 'pie',
            data: [["Garcetti", 50.3], ["Greuel", 49.7]]
        };

        var maleNumbers = {
            name: 'Male Vote',
            color: '#005873',
            type: 'pie',
            data: [["Garcetti", 60.4], ["Greuel", 39.6]]
        };

        var charts = [];

        charts.push(new Highcharts.Chart(
            getChartConfig('data-chart-one', 'Females', femaleNumbers)
        ))

        charts.push(new Highcharts.Chart(
            getChartConfig('data-chart-two', 'Males', maleNumbers)
        ))

    };

    // display data from tabletop
    function processGeographyData(){

        var valleyNumbers = {
            name: 'Valley residents',
            color: '#005873',
            type: 'pie',
            data: [["Garcetti", 48.8], ["Greuel", 51.2]]
        };

        var nonvalleyNumbers = {
            name: 'Non valley residents',
            color: '#005873',
            type: 'pie',
            data: [["Garcetti", 58.1], ["Greuel", 41.9]]
        };

        var charts = [];

        charts.push(new Highcharts.Chart(
            getChartConfig('data-chart-three', 'Valley residents', valleyNumbers)
        ))

        charts.push(new Highcharts.Chart(
            getChartConfig('data-chart-four', 'Non-valley residents', nonvalleyNumbers)
        ))

    };

    // display data from tabletop
    function processHousingData(){

        var rentNumbers = {
            name: 'Rent',
            color: '#005873',
            type: 'pie',
            data: [["Garcetti", 51.7], ["Greuel", 48.3]]
        };

        var ownNumbers = {
            name: 'Own',
            color: '#005873',
            type: 'pie',
            data: [["Garcetti", 58.3], ["Greuel", 41.7]]
        };

        var charts = [];

        charts.push(new Highcharts.Chart(
            getChartConfig('data-chart-five', 'Renters', rentNumbers)
        ))

        charts.push(new Highcharts.Chart(
            getChartConfig('data-chart-six', 'Homeowners', ownNumbers)
        ))

    };

    // display data from tabletop
    function processMilitaryData(){

        var nonserviceNumbers = {
            name: 'Nonservice',
            color: '#005873',
            type: 'pie',
            data: [["Garcetti", 53.2], ["Greuel", 46.8]]
        };

        var serviceNumbers = {
            name: 'Service',
            color: '#005873',
            type: 'pie',
            data: [["Garcetti", 63.5], ["Greuel", 36.5]]
        };

        var charts = [];

        charts.push(new Highcharts.Chart(
            getChartConfig('data-chart-seven', 'No military service ', nonserviceNumbers)
        ))

        charts.push(new Highcharts.Chart(
            getChartConfig('data-chart-eight', 'Enlisted or veteran', serviceNumbers)
        ))

    };

    function getChartConfig(divToRenderChart, titleText, data) {

        var config = {};

        config.chart = {
            renderTo: divToRenderChart,
            zoomType: 'xy',
            backgroundColor: '#eaeaea',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        };

        config.title = {
            text: titleText
        };

        config.tooltip = {
            enabled: true,
            formatter: function(){
                return ''+ this.point.name +': '+ Highcharts.numberFormat(this.y, 2, '.');
            }
        };

        config.plotOptions = {
            pie: {
                allowPointSelect: false,
                cursor: 'pointer',
                showInLegend: true,
                dataLabels: {
                    enabled: false,
                    color: '#000000',
                    connectorColor: '#000000',
                    formatter: function() {
                        return '<strong>' + this.point.name + '</strong><br />' +
                        Highcharts.numberFormat(this.y, 2, '.');
                    }
                }
            }
        };

        config.credits = {
            enabled: false,
            text: 'KPCC'
        };

        config.series = [data];
        return config;
    };