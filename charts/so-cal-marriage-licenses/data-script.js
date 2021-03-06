    var jqueryNoConflict = jQuery;

    // write chart on page load
    jqueryNoConflict(document).ready(function(){
        createChart('data-chart', dataSeries);
    });

    var dataSeries = [{
        name: 'San Bernardino',
        data: [
            874, 1140
        ]
    }, {
        name: 'Riverside',
        data: [
            941, 1744
        ]
    }, {
        name: 'Orange',
        data: [
            2169, 2679
        ]
    }, {
        name: 'Los Angeles',
        data: [
            5278, 7740
        ]
    }]

    function createChart(renderToContainer, dataSeries) {
        var chart = new Highcharts.Chart({
            chart: {
                renderTo: renderToContainer,
                type: 'bar',
            },
            title: {
                text: 'Marriage licenses spike after demise of Prop 8',
            },
            subtitle: {
                text: 'Source: Los Angeles, Orange, Riverside and San Bernardino county clerks',
            },
            xAxis: {
                categories: [
                    'July 2012',
                    'July 2013',
                ],

                title: {
                    text: null
                }
            },
            yAxis: {
                title: {
                    text: null
                },
                stackLabels: {
                    enabled: true,
                    align: 'left',
                    x: 25,
                    style: {
                        fontSize: '14px',
                        lineHeight: '16px',
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || '#ffffff'
                    },
                    formatter: function() {
                        return 'Overall total: ' + Highcharts.numberFormat(this.total, 0, ',');
                    }
                }
            },
            tooltip: {
                formatter: function() {
                    return this.series.name +' County: '+ Highcharts.numberFormat(this.y, 0, ',');
                }
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
                x: 10,
                y: 0,
                floating: false,
                borderWidth: 1,
                backgroundColor: '#FFFFFF',
                shadow: true,
                reversed: true,
                margin: 30
            },
            credits: {
                enabled: false,
                text: 'Source: Los Angeles, Orange, Riverside and San Bernardino county clerks'
            },

            plotOptions: {
                series: {
                    stacking: 'normal',
                }
            },

            series: dataSeries
        });
    }