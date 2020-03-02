
var showHeader = $('.filter').offset().top;
var headerHeight = 70;
var filterLabelHeight = 31; //this one is without border-bottom
function fixedHeader (){
    if ($(this).scrollTop() > (showHeader + filterLabelHeight - headerHeight) ) {
        $('.page_header').addClass('fixed');
        $('.filter').addClass('fixed');
    } else {
        $('.page_header').removeClass('fixed');
        $('.filter').removeClass('fixed');
    }
}
$(window).scroll(function(){
    fixedHeader();
});
$(document).ready(function(){
    fixedHeader();
});

