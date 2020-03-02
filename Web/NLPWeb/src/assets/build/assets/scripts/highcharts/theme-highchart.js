Highcharts.theme = {
    colors: ['#3BB001', '#FFC107', '#FD7E14', '#007BFF', '#DC3545', '#27D4D4', '#17A2B8', '#f10075', '#d4d4d4', '#59b9ef'],
    /////////  Green     Yellow     Orange      Blue       RED      Torquoise   D-Torquoise Pink      Silver       blue-pri
    colors2: ['#DC3545', '#FD7E14', '#007BFF', '#27D4D4', '#17A2B8', '#f10075', '#d4d4d4', '#C3002F' ],
    /////////   RED     Orange      Blue       Torquoise   D-Torquoise Pink      Silver       Maroon
    chart: {

        style: {
            fontFamily: 'Roboto'
        },
        backgroundColor: {
            backgroundColor: '#fff',
            stops: [
                [0, 'rgb(255, 255, 255)'],
                [1, 'rgb(240, 240, 255)']
            ]
        },
    },
    credits: {
        enabled: false
    },
    title: {
         style: {
            color: '#34495e',
            fontWeight: '700',
            fontSize: '30px'
        }
    },
    subtitle: {
        style: {
            color: '#34495e',
            fontSize: '11px',
            fontWeight: '500',
            textTransform: 'uppercase'
        }
    },

    legend: {
        itemStyle: {
            color: '#666666',
           // fontWeight:'400'
        },
        itemHoverStyle:{
            color: '#999999'
        }
    }
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);