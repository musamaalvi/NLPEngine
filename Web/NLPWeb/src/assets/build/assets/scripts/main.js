// $('.kpi__score h2').each(function () {
//     var original = $(this).text();
//     $(this).prop('Counter',0).animate({
//         Counter: $(this).text()
//     }, {
//         duration: 1000,
//         easing: 'swing',
//         step: function (now) {
//             if (original.indexOf('.') > -1) {
//               $(this).text(now.toFixed(1));
//             }
//             else {
//               $(this).text(Math.round(now));
//             }
//         },
//         complete: function () {
//         	$(this).text(original);
//         }
//     });
// });

//
// $(function () {
//     $('.widget').matchHeight({property: 'min-height'});
// });
//
//
// $(".mCustomScrollbar").mCustomScrollbar({
//     advanced: {updateOnContentResize: true}
// });
//
//
// //wow function
//
// new WOW().init();

// click wave effect
var clickTimeout;
$.fn.googleclick = function () {
    $(this).css({
        "position": "relative",
        "overflow": "hidden",
    });

    this.mousedown(function (e) {
        stopCleaningUpClicks();
        var additionalStyles = $(this).data("additionalStyles");
        if (!additionalStyles) {
            additionalStyles = "";
        }
        var thisOffset = $(this).offset();
        var size = this.offsetWidth;
        var x = e.pageX - thisOffset.left - size / 2;
        var y = e.pageY - thisOffset.top - size / 2;
        var styles = "left:" + x + "px;top:" + y + "px;width:" + size + "px;height:" + size + "px";
        $(this).append("<div class='gc-wave wave dark " + additionalStyles + "' style=" + styles + "></div>");
        clickTimeout = setTimeout(cleanUpClicks, 2000);
    });

    function cleanUpClicks() {
        $(".gc-wave").remove();
    }

    function stopCleaningUpClicks() {
        clearTimeout(clickTimeout);
    }
};


$(document).ready(function () {

  //  $(".sidebar-menu > ul >  li > a, .btn,.nav__link").googleclick();

    $('.filter__trigger').click(function(){
        $(this).parent().toggleClass('active');
        $(this).next('.filter-dropdown').toggleClass('active');
        $(this).parent().next('.filter-dropdown').toggleClass('active');

    });

    $(".menu-node").click(function () {
        $(this).toggleClass("active");
        $("nav").slideToggle();
    });

    $('.widget').matchHeight();

    $('#kpi1').highcharts({

        chart: {
            type: 'gauge',
            spacingBottom: 5,
            spacingTop: 5,
            spacingLeft: 5,
            spacingRight: 5,
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false

        },

        credits: {
            enabled: false
        },
        pane: [
            {
                startAngle: -180,
                endAngle: 180,
                background: [
                    {
                        backgroundColor: '#010101',
                        borderWidth: 12,
                        borderColor: '#e6e6e6',
                        outerRadius: '116%',
                        //  innerRadius: "100%"
                    }
                ]
            }
        ],
        plotOptions: {
            gauge: {
                borderWidth: 100,
                pivot: {
                    radius: 0
                },
                dial: {
                    radius: '100%',
                    backgroundColor: '#4edd9e',
                    baseWidth: 3,
                    topWidth: 3,
                    rearLength: '-77%'
                }
            }
        },
        title: {
            text: '100.0',
            align: 'center',
            textTransform: 'uppercase',
            verticalAlign: 'top',
            y: 120,
            style: {
                width: '20%',
                color: 'white',
                fontSize: '30px',
                fontWeight: '500',
            }
        },
        subtitle: {
            text: 'Trp - net <br> Promotor score',
            align: 'center',
            verticalAlign: 'top',
            y: 75,
            style: {
                width: '15%',
                fontSize: '11px',
                fontWeight: '400',
                color: 'white',
                textTransform: 'capitalize',
            }
        },
        // the value axis
        yAxis: {
            min: 0,
            max: 100,
            gridLineColor: 'black',
            minorTickInterval: 'auto',
            minorTickWidth: 1.3,
            minorTickLength: 12,
            minorTickPosition: 'inside',
            minorTickColor: '#fec42a',
            tickPixelInterval: 20,
            lineColor: 'transparent',
            tickWidth: 0,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: 'white',
            plotBands: [{
                from: 0,
                to: 200,
                color: '#fff',
                outerRadius: '76%',
                thickness: '2%',

            }],
            labels: {
                step: 10,
                enabled: false,
                rotation: 'auto'
            }
        },

        series: [{
            data: [{
                y: 65

            },
                {
                    y: 88,
                    id: 'series-1',
                    name: 'green',
                    marker: {
                        fillColor: 'red',
                        radius: 50
                    },
                    dial: {
                        radius: '85%',
                        backgroundColor: '#0f7d4c',
                        borderColor: '#0f7d4c',
                        borderWidth: 1,
                        borderRadius: 10,
                        markerEnd: 'arrow',
                        baseWidth: 12,
                        topWidth: 1,
                        baseLength: '80%'
                    }
                }, {
                    y: 60,
                    dial: {
                        backgroundColor: "#ff6d2a",
                        radius: "85%",
                        borderColor: '#ff6d2a',
                        borderWidth: 1,
                        baseWidth: 12,
                        topWidth: 1,
                        baseLength: '80%'
                    },


                }
            ],

            tooltip: {
                valueSuffix: ' km/h'
            },
            dataLabels: {
                enabled: false,
            }
        }]

    });
    $('#kpi2').highcharts({

        chart: {
            type: 'gauge',
            spacingBottom: 5,
            spacingTop: 5,
            spacingLeft: 5,
            spacingRight: 5,
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false

        },

        credits: {
            enabled: false
        },
        pane: [
            {
                startAngle: -180,
                endAngle: 180,
                background: [
                    {
                        backgroundColor: '#010101',
                        borderWidth: 12,
                        borderColor: '#e6e6e6',
                        outerRadius: '116%',
                        //  innerRadius: "100%"
                    }
                ]
            }
        ],
        plotOptions: {
            gauge: {
                borderWidth: 100,
                pivot: {
                    radius: 0
                },
                dial: {
                    radius: '100%',
                    backgroundColor: '#4edd9e',
                    baseWidth: 3,
                    topWidth: 3,
                    rearLength: '-77%'
                }
            }
        },
        title: {
            text: '33.3',
            align: 'center',
            textTransform: 'uppercase',
            verticalAlign: 'top',
            y: 120,
            style: {
                width: '20%',
                color: 'white',
                fontSize: '30px',
                fontWeight: '500',
            }
        },
        subtitle: {
            text: 'Purchase <br> Alert Resolution %',
            align: 'center',
            verticalAlign: 'top',
            y: 75,
            style: {
                width: '15%',
                fontSize: '11px',
                fontWeight: '400',
                color: 'white',
                textTransform: 'capitalize',
            }
        },
        // the value axis
        yAxis: {
            min: 0,
            max: 100,
            gridLineColor: 'black',
            minorTickInterval: 'auto',
            minorTickWidth: 1.3,
            minorTickLength: 12,
            minorTickPosition: 'inside',
            minorTickColor: '#fec42a',
            tickPixelInterval: 20,
            lineColor: 'transparent',
            tickWidth: 0,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: 'white',
            plotBands: [{
                from: 0,
                to: 200,
                color: '#fff',
                outerRadius: '76%',
                thickness: '2%',

            }],
            labels: {
                step: 10,
                enabled: false,
                rotation: 'auto'
            }
        },

        series: [{
            data: [{
                y: 65

            },
                {
                    y: 88,
                    id: 'series-1',
                    name: 'green',
                    marker: {
                        fillColor: 'red',
                        radius: 50
                    },
                    dial: {
                        radius: '85%',
                        backgroundColor: '#0f7d4c',
                        borderColor: '#0f7d4c',
                        borderWidth: 1,
                        borderRadius: 10,
                        markerEnd: 'arrow',
                        baseWidth: 12,
                        topWidth: 1,
                        baseLength: '80%'
                    }
                }, {
                    y: 60,
                    dial: {
                        backgroundColor: "#ff6d2a",
                        radius: "85%",
                        borderColor: '#ff6d2a',
                        borderWidth: 1,
                        baseWidth: 12,
                        topWidth: 1,
                        baseLength: '80%'
                    },


                }
            ],

            tooltip: {
                valueSuffix: ' km/h'
            },
            dataLabels: {
                enabled: false,
            }
        }]

    });
    $('#kpi3').highcharts({

        chart: {
            type: 'gauge',
            spacingBottom: 5,
            spacingTop: 5,
            spacingLeft: 5,
            spacingRight: 5,
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false

        },

        credits: {
            enabled: false
        },
        pane: [
            {
                startAngle: -180,
                endAngle: 180,
                background: [
                    {
                        backgroundColor: '#010101',
                        borderWidth: 12,
                        borderColor: '#e6e6e6',
                        outerRadius: '116%',
                        //  innerRadius: "100%"
                    }
                ]
            }
        ],
        plotOptions: {
            gauge: {
                borderWidth: 100,
                pivot: {
                    radius: 0
                },
                dial: {
                    radius: '100%',
                    backgroundColor: '#4edd9e',
                    baseWidth: 3,
                    topWidth: 3,
                    rearLength: '-77%'
                }
            }
        },
        title: {
            text: '-100.0',
            align: 'center',
            textTransform: 'uppercase',
            verticalAlign: 'top',
            y: 120,
            style: {
                width: '20%',
                color: 'white',
                fontSize: '30px',
                fontWeight: '500',
            }
        },
        subtitle: {
            text: 'TSR - <br>(Net Promoter Score)',
            align: 'center',
            verticalAlign: 'top',
            y: 75,
            style: {
                width: '15%',
                fontSize: '11px',
                fontWeight: '400',
                color: 'white',
                textTransform: 'capitalize',
            }
        },
        // the value axis
        yAxis: {
            min: 0,
            max: 100,
            gridLineColor: 'black',
            minorTickInterval: 'auto',
            minorTickWidth: 1.3,
            minorTickLength: 12,
            minorTickPosition: 'inside',
            minorTickColor: '#fec42a',
            tickPixelInterval: 20,
            lineColor: 'transparent',
            tickWidth: 0,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: 'white',
            plotBands: [{
                from: 0,
                to: 200,
                color: '#fff',
                outerRadius: '76%',
                thickness: '2%',

            }],
            labels: {
                step: 10,
                enabled: false,
                rotation: 'auto'
            }
        },

        series: [{
            name: "my series1",
            data: [{
                y: 65

            },
                 {
                     y: 60,
                     id: "msyasdhasdhnads",
                    dial: {
                        backgroundColor: "#ff6d2a",
                        radius: "85%",
                        borderColor: '#ff6d2a',
                        borderWidth: 1,
                        baseWidth: 12,
                        topWidth: 1,
                        baseLength: '80%'
                    },


                }
            ],

            tooltip: {
                valueSuffix: ' km/h'
            },
            dataLabels: {
                enabled: false,
            }
        },
            {
                name: "mySeries 2", 
                data: [{
                    y: 88,
                   name: 'green',
                    marker: {
                        fillColor: 'red',
                        radius: 50
                    },
                    dial: {
                        radius: '85%',
                        backgroundColor: '#0f7d4c',
                        borderColor: '#0f7d4c',
                        borderWidth: 1,
                        borderRadius: 10,
                        markerEnd: 'arrow',
                        baseWidth: 12,
                        topWidth: 1,
                        baseLength: '80%'
                    }
                }],
                tooltip: {
                    valueSuffix: ' km/h'
                },
                dataLabels: {
                    enabled: false,
                }
            }]

    });
    $('#kpi4').highcharts({

        chart: {
            type: 'gauge',
            spacingBottom: 5,
            spacingTop: 5,
            spacingLeft: 5,
            spacingRight: 5,
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false

        },

        credits: {
            enabled: false
        },
        pane: [
            {
                startAngle: -180,
                endAngle: 180,
                background: [
                    {
                        backgroundColor: '#010101',
                        borderWidth: 12,
                        borderColor: '#e6e6e6',
                        outerRadius: '116%',
                        //  innerRadius: "100%"
                    }
                ]
            }
        ],
        plotOptions: {
            gauge: {
                borderWidth: 100,
                pivot: {
                    radius: 0
                },
                dial: {
                    radius: '100%',
                    backgroundColor: '#4edd9e',
                    baseWidth: 3,
                    topWidth: 3,
                    rearLength: '-77%'
                }
            }
        },
        title: {
            text: '75.0',
            align: 'center',
            textTransform: 'uppercase',
            verticalAlign: 'top',
            y: 120,
            style: {
                width: '20%',
                color: 'white',
                fontSize: '30px',
                fontWeight: '500',
            }
        },
        subtitle: {
            text: 'Service <br> Alert Resolution',
            align: 'center',
            verticalAlign: 'top',
            y: 75,
            style: {
                width: '15%',
                fontSize: '11px',
                fontWeight: '400',
                color: 'white',
                textTransform: 'capitalize',
            }
        },
        // the value axis
        yAxis: {
            min: 0,
            max: 100,
            gridLineColor: 'black',
            minorTickInterval: 'auto',
            minorTickWidth: 1.3,
            minorTickLength: 12,
            minorTickPosition: 'inside',
            minorTickColor: '#fec42a',
            tickPixelInterval: 20,
            lineColor: 'transparent',
            tickWidth: 0,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: 'white',
            plotBands: [{
                from: 0,
                to: 200,
                color: '#fff',
                outerRadius: '76%',
                thickness: '2%',

            }],
            labels: {
                step: 10,
                enabled: false,
                rotation: 'auto'
            }
        },

        series: [{
            data: [{
                y: 65

            },
                {
                    y: 88,
                    id: 'series-1',
                    name: 'green',
                    marker: {
                        fillColor: 'red',
                        radius: 50
                    },
                    dial: {
                        radius: '85%',
                        backgroundColor: '#0f7d4c',
                        borderColor: '#0f7d4c',
                        borderWidth: 1,
                        borderRadius: 10,
                        markerEnd: 'arrow',
                        baseWidth: 12,
                        topWidth: 1,
                        baseLength: '80%'
                    }
                }, {
                    y: 60,
                    dial: {
                        backgroundColor: "#ff6d2a",
                        radius: "85%",
                        borderColor: '#ff6d2a',
                        borderWidth: 1,
                        baseWidth: 12,
                        topWidth: 1,
                        baseLength: '80%'
                    },


                }
            ],

            tooltip: {
                valueSuffix: ' km/h'
            },
            dataLabels: {
                enabled: false,
            }
        }]

    });


    $('#pt').highcharts({
        chart: {
            type: 'area'
        },
        credits: {
            enabled: false
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom'
        },


        yAxis: {
           // allowDecimals: true,
            title: {
                text: ''
            },
            labels: {
                format: '{value} '
            }
        },
        title: {
            text: ''
        },
        plotOptions: {
            area: {
                fillOpacity: 0.05,
                marker: {
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: null,
                    symbol: 'circle'
                }
            }
        },
        colors: [
            Highcharts.theme.colors[9]
        ],
        xAxis: {

            gridLineWidth: 1,
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },

        series: [{
            name: 'National',
            data: [10, 20, 30, 40, 50, 60,70,80,90,100,110,120],
            label: {enabled: false}

        }

        ]


    });

    $('#ae').highcharts({
        chart: {
            type: 'areaspline'
        },
        credits: {
            enabled: false
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom'
        },


        yAxis: {

            title: {
                text: ''
            }
        },
        title: {
            text: ''
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.05
            }
        },
        xAxis: {
            gridLineWidth: 1,
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },

        series: [{
            name: 'New',
            data: [43934, 52503, 57177, 69658, 97031, 119931],
            showInLegend: true,
            label: {enabled: false},
            marker: {
                //fillColor: '#B4A996',
                radius: 5,
                symbol: 'circle'
            }

        }, {
            name: 'In Progress',
            data: [12908, 5948, 8105, 11248, 8989, 11816],
            showInLegend: true,
            label: {enabled: false},
            marker: {
                //fillColor: '#B4A996',
                radius: 5,
                symbol: 'circle'
            }
        }, {
            name: 'Late',
            data: [1, 2, 5, 6, 8, 9],
            showInLegend: true,
            label: {enabled: false},
            marker: {
                //fillColor: '#B4A996',
                radius: 5,
                symbol: 'circle'
            }
        }, {
            name: 'Closed within Target',
            data: [15, 85, 2, 58, 52, 55],
            showInLegend: true,
            label: {enabled: false},
            marker: {
                //fillColor: '#B4A996',
                radius: 5,
                symbol: 'circle'
            }
        }, {
            name: 'Closed After Target',
            data: [100, 120, 140, 160, 180, 200],
            showInLegend: true,
            label: {enabled: false},
            marker: {
                //fillColor: '#B4A996',
                radius: 5,
                symbol: 'circle'
            }
        }

        ]


    });

    $('#ai').highcharts({
        chart: {
            type: 'column'
        },
        credits: {
            enabled: false
        },
        title: {
            text: '',
            /*style: {
                color: '#666666',
                fontWeight: '700',
                fontSize: '14px'
            }*/
        },
        xAxis: {
            gridLineWidth: 1,
            categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5']
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            enabled: true,
            useHTML: true,
            formatter: function () {
                return '<b>' + Highcharts.numberFormat(this.y, 1) + '</b>';
            },
            shared: true
        },
        /* plotOptions: {

         },*/

        plotOptions: {
            column: {
                cursor: 'pointer',
                enableMouseTracking: true,
                stacking: 'normal',
                borderWidth: 0
            }

        },
        colors: [
            Highcharts.theme.colors[9]
        ],
        series: [{
            type: 'column',
            pointWidth: 20,
            colorByPoint: true,
            borderRadiusTopLeft: 3,
            borderRadiusTopRight: 3,
            name: '',
            showInLegend: false,
            data: [2, 2, 3, 2, 1]
        }]


    });


    $('#re').highcharts({
        chart: {
            type: 'column'
        },
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        xAxis: {
            gridLineWidth: 1,
            categories: ['Q1']
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            enabled: true,
            useHTML: true,
            formatter: function () {
                return '<b>' + Highcharts.numberFormat(this.y, 1) + '</b>';
            },
            shared: true
        },
        /* plotOptions: {

         },*/

        plotOptions: {
            column: {
                cursor: 'pointer',
                enableMouseTracking: true,
                stacking: 'normal',
                borderWidth: 0
            }

        },
        colors: [
            Highcharts.theme.colors[9]
        ],
        series: [{
            type: 'column',
            pointWidth: 20,
           // colorByPoint: true,
            borderRadiusTopLeft: 3,
           borderRadiusTopRight: 3,
            name: 'Dealer',
            color: Highcharts.theme.colors[3],
            showInLegend: true,
            data: [1,2]
        },
            {
                type: 'column',
                pointWidth: 20,
              //  colorByPoint: true,
             //   borderRadiusTopLeft: 3,
             //   borderRadiusTopRight: 3,
                name: 'National',
                color: Highcharts.theme.colors[7],
                showInLegend: true,
                data: [3,4]
            }]


    });


    $('#key1').highcharts({
        chart: {
            type: 'column'
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Your Highest Scoring Questions',
            style: {
                fontSize: '12px'
            }
        },
        xAxis: {
            gridLineWidth: 1,
            categories: ['Q1', 'Q2', 'Q3']
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            enabled: true,
            useHTML: true,
            formatter: function () {
                return '<b>' + Highcharts.numberFormat(this.y, 1) + '</b>';
            },
            shared: true
        },
        /* plotOptions: {

         },*/

        plotOptions: {
            column: {
                cursor: 'pointer',
                enableMouseTracking: true,
                stacking: 'normal',
                borderWidth: 0
            }

        },
        colors: [
            Highcharts.theme.colors[0]
        ],
        series: [{
            type: 'column',
            pointWidth: 20,
            colorByPoint: true,
            borderRadiusTopLeft: 3,
            borderRadiusTopRight: 3,
            name: '',
            showInLegend: false,
            data: [1, 2, 3]
        }]


    });

    $('#key2').highcharts({
        chart: {
            type: 'column'
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Your Lowest Scoring Questions',
            style: {
                fontSize: '12px'
            }
        },
        xAxis: {
            gridLineWidth: 1,
            categories: ['Q1', 'Q2', 'Q3']
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            enabled: true,
            useHTML: true,
            formatter: function () {
                return '<b>' + Highcharts.numberFormat(this.y, 1) + '</b>';
            },
            shared: true
        },
        /* plotOptions: {

         },*/

        plotOptions: {
            column: {
                cursor: 'pointer',
                enableMouseTracking: true,
                stacking: 'normal',
                borderWidth: 0
            }

        },
        colors: [
            Highcharts.theme.colors[4]
        ],
        series: [{
            type: 'column',
            pointWidth: 20,
            colorByPoint: true,
            borderRadiusTopLeft: 3,
            borderRadiusTopRight: 3,
            name: '',
            showInLegend: false,
            data: [1, 2, 3]
        }]


    });

    $('#piechart').highcharts({
        chart: {
            renderTo: 'container',
            spacingBottom: 10,
            spacingTop: 10,
            spacingLeft: 0,
            spacingRight: 0,
            //  marginRight:250,
            type: 'pie'
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            floating: true,
            backgroundColor: '#FFFFFF',
            padding: 5,
            // itemMarginTop: 5,
            itemMarginBottom: 15,
            itemStyle: {
                color: '#b2b2b2',
                fontWeight: '600'
            },
        },
        title: {
            // useHTML:true,
            // text: 'kpi',
            useHTML: true,
            align: 'center',
            text: '<span class="pie-chart"><span class="chart__title">KPI</span> <span class="chart__count">48.9</span>  <span class="chart__label">Alert Count</span> <span class="chart__link">88</span></span>',
            verticalAlign: 'top',
            y: 75,
            style: {
                color: '#666666',
                textTransform: 'uppercase',
                fontWeight: '700',
                zIndex: 0,
                fontSize: '12px'
            }
        },


        yAxis: {
            title: {
                text: 'tes'
            }
        },
        plotOptions: {
            pie: {
                shadow: false,
                borderWidth: 0
            }

        },


        tooltip: {
            useHTML:true,
            backgroundColor: 'none',
            padding:1,
            shadow: false,

            formatter: function () {
                return '<b>' + this.point.name + '</b>: ' + this.y + ' %';
            }
        },
        series: [{
            name: '',
            data: [["New", 6],["In Progress", 7], ["Late", 7],["Closed Within Target", 7], ["Close Out Of Target", 7]],
            size: '100%',
            innerSize: '85%',
            showInLegend: true,
            dataLabels: {
                enabled: false
            }
        }]


    });

     Highcharts.chart('sdguage', {
        chart: {
            type: 'pie'
        },

        credits: {
            enabled: false
        },

        title: {
            text: ''
        },

        tooltip: {
            enabled: false
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            size: '48',
            innerSize: '33',
            data: [
                {
                    name: "", y:50, color: Highcharts.theme.colors[0]
                },
                {
                    name: "", y:100, color: Highcharts.theme.colors[8]
                }
            ]
        }]
    });



    Highcharts.chart('sdguag-line', {
        chart: {
            backgroundColor: null,
            borderWidth: 0,
            type: 'spline',
            height: '50px',
            skipClone: true
        },
        legends: {
            enabled: false
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        colors: [
            Highcharts.theme.colors[0]
        ],
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                }
            }
        },
        xAxis: {

            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            lineWidth: 0,
            //  categories: categories,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: []
        },
        labels: {
            enabled: false
        },
        series: [
            {
                showInLegend: false,
                dataLabels: {
                    enabled: false
                },
                name: '',
                data: [100, 100, 98, 96],
                label: ''
            }
        ],


    });


    Highcharts.chart('sdguage1', {
        chart: {
            type: 'pie'
        },

        credits: {
            enabled: false
        },

        title: {
            text: ''
        },

        tooltip: {
            enabled: false
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            size: '48',
            innerSize: '33',
            data: [
                {
                    name: "", y:80, color: Highcharts.theme.colors[1]
                },
                {
                    name: "", y:100, color: Highcharts.theme.colors[8]
                }
            ]
        }]
    });



    Highcharts.chart('sdguag-line1', {
        chart: {
            backgroundColor: null,
            borderWidth: 0,
            type: 'spline',
            height: '50px',
            skipClone: true
        },
        legends: {
            enabled: false
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        colors: [
            Highcharts.theme.colors[1]
        ],
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                }
            }
        },
        xAxis: {

            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            lineWidth: 0,
            //  categories: categories,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: []
        },
        labels: {
            enabled: false
        },
        series: [
            {
                showInLegend: false,
                dataLabels: {
                    enabled: false
                },
                name: '',
                data: [100, 100, 98, 96],
                label: ''
            }
        ],


    });


    Highcharts.chart('sdguage2', {
        chart: {
            type: 'pie'
        },

        credits: {
            enabled: false
        },

        title: {
            text: ''
        },

        tooltip: {
            enabled: false
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            size: '48',
            innerSize: '33',
            data: [
                {
                    name: "", y:80, color: Highcharts.theme.colors[2]
                },
                {
                    name: "", y:100, color: Highcharts.theme.colors[8]
                }
            ]
        }]
    });



    Highcharts.chart('sdguag-line2', {
        chart: {
            backgroundColor: null,
            borderWidth: 0,
            type: 'spline',
            height: '50px',
            skipClone: true
        },
        legends: {
            enabled: false
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        colors: [
            Highcharts.theme.colors[2]
        ],
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                }
            }
        },
        xAxis: {

            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            lineWidth: 0,
            //  categories: categories,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: []
        },
        labels: {
            enabled: false
        },
        series: [
            {
                showInLegend: false,
                dataLabels: {
                    enabled: false
                },
                name: '',
                data: [100, 100, 98, 96],
                label: ''
            }
        ],


    });

    Highcharts.chart('sdguage3', {
        chart: {
            type: 'pie'
        },

        credits: {
            enabled: false
        },

        title: {
            text: ''
        },

        tooltip: {
            enabled: false
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            size: '48',
            innerSize: '33',
            data: [
                {
                    name: "", y:80, color: Highcharts.theme.colors[3]
                },
                {
                    name: "", y:100, color: Highcharts.theme.colors[8]
                }
            ]
        }]
    });



    Highcharts.chart('sdguag-line3', {
        chart: {
            backgroundColor: null,
            borderWidth: 0,
            type: 'spline',
            height: '50px',
            skipClone: true
        },
        legends: {
            enabled: false
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        colors: [
            Highcharts.theme.colors[3]
        ],
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                }
            }
        },
        xAxis: {

            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            lineWidth: 0,
            //  categories: categories,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: []
        },
        labels: {
            enabled: false
        },
        series: [
            {
                showInLegend: false,
                dataLabels: {
                    enabled: false
                },
                name: '',
                data: [100, 100, 98, 96],
                label: ''
            }
        ],


    });

    Highcharts.chart('sdguage4', {
        chart: {
            type: 'pie'
        },

        credits: {
            enabled: false
        },

        title: {
            text: ''
        },

        tooltip: {
            enabled: false
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            size: '48',
            innerSize: '33',
            data: [
                {
                    name: "", y:80, color: Highcharts.theme.colors[4]
                },
                {
                    name: "", y:100, color: Highcharts.theme.colors[8]
                }
            ]
        }]
    });



    Highcharts.chart('sdguag-line4', {
        chart: {
            backgroundColor: null,
            borderWidth: 0,
            type: 'spline',
            height: '50px',
            skipClone: true
        },
        legends: {
            enabled: false
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        colors: [
            Highcharts.theme.colors[4]
        ],
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                }
            }
        },
        xAxis: {

            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            lineWidth: 0,
            //  categories: categories,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: []
        },
        labels: {
            enabled: false
        },
        series: [
            {
                showInLegend: false,
                dataLabels: {
                    enabled: false
                },
                name: '',
                data: [100, 100, 98, 96],
                label: ''
            }
        ],


    });

    Highcharts.chart('sdguage5', {
        chart: {
            type: 'pie'
        },

        credits: {
            enabled: false
        },

        title: {
            text: ''
        },

        tooltip: {
            enabled: false
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            size: '48',
            innerSize: '33',
            data: [
                {
                    name: "", y:80, color: Highcharts.theme.colors[5]
                },
                {
                    name: "", y:100, color: Highcharts.theme.colors[8]
                }
            ]
        }]
    });



    Highcharts.chart('sdguag-line5', {
        chart: {
            backgroundColor: null,
            borderWidth: 0,
            type: 'spline',
            height: '50px',
            skipClone: true
        },
        legends: {
            enabled: false
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        colors: [
            Highcharts.theme.colors[5]
        ],
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                }
            }
        },
        xAxis: {

            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            lineWidth: 0,
            //  categories: categories,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: []
        },
        labels: {
            enabled: false
        },
        series: [
            {
                showInLegend: false,
                dataLabels: {
                    enabled: false
                },
                name: '',
                data: [100, 100, 98, 96],
                label: ''
            }
        ],


    });

    Highcharts.chart('sdguage6', {
        chart: {
            type: 'pie'
        },

        credits: {
            enabled: false
        },

        title: {
            text: ''
        },

        tooltip: {
            enabled: false
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            size: '48',
            innerSize: '33',
            data: [
                {
                    name: "", y:80, color: Highcharts.theme.colors[6]
                },
                {
                    name: "", y:100, color: Highcharts.theme.colors[8]
                }
            ]
        }]
    });



    Highcharts.chart('sdguag-line6', {
        chart: {
            backgroundColor: null,
            borderWidth: 0,
            type: 'spline',
            height: '50px',
            skipClone: true
        },
        legends: {
            enabled: false
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        colors: [
            Highcharts.theme.colors[6]
        ],
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                }
            }
        },
        xAxis: {

            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            lineWidth: 0,
            //  categories: categories,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: []
        },
        labels: {
            enabled: false
        },
        series: [
            {
                showInLegend: false,
                dataLabels: {
                    enabled: false
                },
                name: '',
                data: [100, 100, 98, 96],
                label: ''
            }
        ],


    });

    Highcharts.chart('sdguage7', {
        chart: {
            type: 'pie'
        },

        credits: {
            enabled: false
        },

        title: {
            text: ''
        },

        tooltip: {
            enabled: false
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            size: '48',
            innerSize: '33',
            data: [
                {
                    name: "", y:80, color: Highcharts.theme.colors[7]
                },
                {
                    name: "", y:100, color: Highcharts.theme.colors[8]
                }
            ]
        }]
    });



    Highcharts.chart('sdguag-line7', {
        chart: {
            backgroundColor: null,
            borderWidth: 0,
            type: 'spline',
            height: '50px',
            skipClone: true
        },
        legends: {
            enabled: false
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        colors: [
            Highcharts.theme.colors[7]
        ],
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                }
            }
        },
        xAxis: {

            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            lineWidth: 0,
            //  categories: categories,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: []
        },
        labels: {
            enabled: false
        },
        series: [
            {
                showInLegend: false,
                dataLabels: {
                    enabled: false
                },
                name: '',
                data: [100, 100, 98, 96],
                label: ''
            }
        ],


    });


    //questions

    Highcharts.chart('qsdguage', {
        chart: {
            type: 'pie'
        },

        credits: {
            enabled: false
        },

        title: {
            text: ''
        },

        tooltip: {
            enabled: false
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            size: '48',
            innerSize: '33',
            data: [
                {
                    name: "", y:50, color: Highcharts.theme.colors[0]
                },
                {
                    name: "", y:100, color: Highcharts.theme.colors[8]
                }
            ]
        }]
    });



    Highcharts.chart('qsdguag-line', {
        chart: {
            backgroundColor: null,
            borderWidth: 0,
            type: 'spline',
            height: '50px',
            skipClone: true
        },
        legends: {
            enabled: false
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        colors: [
            Highcharts.theme.colors[0]
        ],
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                }
            }
        },
        xAxis: {

            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            lineWidth: 0,
            //  categories: categories,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: []
        },
        labels: {
            enabled: false
        },
        series: [
            {
                showInLegend: false,
                dataLabels: {
                    enabled: false
                },
                name: '',
                data: [100, 100, 98, 96],
                label: ''
            }
        ],


    });


    Highcharts.chart('qsdguage1', {
        chart: {
            type: 'pie'
        },

        credits: {
            enabled: false
        },

        title: {
            text: ''
        },

        tooltip: {
            enabled: false
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            size: '48',
            innerSize: '33',
            data: [
                {
                    name: "", y:80, color: Highcharts.theme.colors[1]
                },
                {
                    name: "", y:100, color: Highcharts.theme.colors[8]
                }
            ]
        }]
    });



    Highcharts.chart('qsdguag-line1', {
        chart: {
            backgroundColor: null,
            borderWidth: 0,
            type: 'spline',
            height: '50px',
            skipClone: true
        },
        legends: {
            enabled: false
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        colors: [
            Highcharts.theme.colors[1]
        ],
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                }
            }
        },
        xAxis: {

            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            lineWidth: 0,
            //  categories: categories,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: []
        },
        labels: {
            enabled: false
        },
        series: [
            {
                showInLegend: false,
                dataLabels: {
                    enabled: false
                },
                name: '',
                data: [100, 100, 98, 96],
                label: ''
            }
        ],


    });


    Highcharts.chart('qsdguage2', {
        chart: {
            type: 'pie'
        },

        credits: {
            enabled: false
        },

        title: {
            text: ''
        },

        tooltip: {
            enabled: false
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            size: '48',
            innerSize: '33',
            data: [
                {
                    name: "", y:80, color: Highcharts.theme.colors[2]
                },
                {
                    name: "", y:100, color: Highcharts.theme.colors[8]
                }
            ]
        }]
    });



    Highcharts.chart('qsdguag-line2', {
        chart: {
            backgroundColor: null,
            borderWidth: 0,
            type: 'spline',
            height: '50px',
            skipClone: true
        },
        legends: {
            enabled: false
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        colors: [
            Highcharts.theme.colors[2]
        ],
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                }
            }
        },
        xAxis: {

            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            lineWidth: 0,
            //  categories: categories,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: []
        },
        labels: {
            enabled: false
        },
        series: [
            {
                showInLegend: false,
                dataLabels: {
                    enabled: false
                },
                name: '',
                data: [100, 100, 98, 96],
                label: ''
            }
        ],


    });

    Highcharts.chart('qsdguage3', {
        chart: {
            type: 'pie'
        },

        credits: {
            enabled: false
        },

        title: {
            text: ''
        },

        tooltip: {
            enabled: false
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            size: '48',
            innerSize: '33',
            data: [
                {
                    name: "", y:80, color: Highcharts.theme.colors[3]
                },
                {
                    name: "", y:100, color: Highcharts.theme.colors[8]
                }
            ]
        }]
    });



    Highcharts.chart('qsdguag-line3', {
        chart: {
            backgroundColor: null,
            borderWidth: 0,
            type: 'spline',
            height: '50px',
            skipClone: true
        },
        legends: {
            enabled: false
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        colors: [
            Highcharts.theme.colors[3]
        ],
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                }
            }
        },
        xAxis: {

            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            lineWidth: 0,
            //  categories: categories,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: []
        },
        labels: {
            enabled: false
        },
        series: [
            {
                showInLegend: false,
                dataLabels: {
                    enabled: false
                },
                name: '',
                data: [100, 100, 98, 96],
                label: ''
            }
        ],


    });

    Highcharts.chart('qsdguage4', {
        chart: {
            type: 'pie'
        },

        credits: {
            enabled: false
        },

        title: {
            text: ''
        },

        tooltip: {
            enabled: false
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            size: '48',
            innerSize: '33',
            data: [
                {
                    name: "", y:80, color: Highcharts.theme.colors[4]
                },
                {
                    name: "", y:100, color: Highcharts.theme.colors[8]
                }
            ]
        }]
    });



    Highcharts.chart('qsdguag-line4', {
        chart: {
            backgroundColor: null,
            borderWidth: 0,
            type: 'spline',
            height: '50px',
            skipClone: true
        },
        legends: {
            enabled: false
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        colors: [
            Highcharts.theme.colors[4]
        ],
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                }
            }
        },
        xAxis: {

            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            lineWidth: 0,
            //  categories: categories,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: []
        },
        labels: {
            enabled: false
        },
        series: [
            {
                showInLegend: false,
                dataLabels: {
                    enabled: false
                },
                name: '',
                data: [100, 100, 98, 96],
                label: ''
            }
        ],


    });

    Highcharts.chart('qsdguage5', {
        chart: {
            type: 'pie'
        },

        credits: {
            enabled: false
        },

        title: {
            text: ''
        },

        tooltip: {
            enabled: false
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            size: '48',
            innerSize: '33',
            data: [
                {
                    name: "", y:80, color: Highcharts.theme.colors[5]
                },
                {
                    name: "", y:100, color: Highcharts.theme.colors[8]
                }
            ]
        }]
    });



    Highcharts.chart('qsdguag-line5', {
        chart: {
            backgroundColor: null,
            borderWidth: 0,
            type: 'spline',
            height: '50px',
            skipClone: true
        },
        legends: {
            enabled: false
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false
        },
        colors: [
            Highcharts.theme.colors[5]
        ],
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                }
            }
        },
        xAxis: {

            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            lineWidth: 0,
            //  categories: categories,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: []
        },
        labels: {
            enabled: false
        },
        series: [
            {
                showInLegend: false,
                dataLabels: {
                    enabled: false
                },
                name: '',
                data: [100, 100, 98, 96],
                label: ''
            }
        ],


    });



});

