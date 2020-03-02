
function SetRowStyle(row, display) {
    $(row).css('display', '');
    if (display == "none")
        $(row).addClass('hide');
    else
        $(row).removeClass('hide');
}

function CEGrid(rowids, span, childImgs) {
    $(span).hasClass("open") ? $(span).addClass("close").removeClass("open") : $(span).addClass("open").removeClass("close");
    SetRows(rowids, $(span).hasClass("open"), $(span).closest('table')[0]);

    if (childImgs) {
        var cimgs = childImgs.split(',');
        if (cimgs.length == 2) {
            var cimg1 = $(span).closest('table').find('#' + cimgs[0])[0];
            var cimg2 = $(span).closest('table').find('#' + cimgs[1])[0];
            if ($(span).hasClass("close")) {
                if ($(cimg1).hasClass("open")) {
                    cimg1.onclick();
                }
                if ($(cimg2).hasClass("open")) {
                    cimg2.onclick();
                }
            }
            else if ($(span).hasClass("open")) {
                if ($(cimg1).hasClass("close")) {
                    cimg1.onclick();
                }
                if ($(cimg2).hasClass("close")) {
                    cimg2.onclick();
                }
            }
        }
        else {
            for (x = 0; x < cimgs.length; x++) {
                var cimg = $(span).closest('table').find('#' + cimgs[x])[0];
                if ($(span).hasClass("close") && $(cimg).hasClass("open")) {
                    cimg.onclick();
                }
                else if ($(span).hasClass("open") && $(cimg).hasClass("close")) {
                    cimg.onclick();
                }

            }
        }
    }
    return false;
}

//-------------------------------------------------------------------------------------------------------------------------------

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}
function guid() {

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

//-------------------------------------------------------------------------------------------------------------------------------

function SetRows(rowids, tf, parent) {
    var rows = rowids.split(',');
    for (var i = 0; i < rows.length; i++)
        try {
            $('table').each(function() {
                SetRowStyle($(this).find('#' + rows[i]), tf ? "table-row" : "none");

            });
        } catch (e) {

        }
}

var selfCall = false;
/// Helper Functions
function initGrid(gridId, freeze) {
    var bindFunction = $('#dvg_' + gridId).attr('bindfunction');
    if (bindFunction && bindFunction != "null") {
        eval(bindFunction + "();");
    }
    if (freeze && $('#' + gridId).is(':visible')) {
        FreezeGrid(gridId);
        $(window).scroll(function() {
            WindowScroll(gridId);
        });
        $(window).resize(function() {
            CallSupportingGridResize(gridId);
        });
        selfCall = true;
        GridResize(gridId);
        selfCall = false;
    }
}
function GridResize(gridId) {
    if ($(window).width() > 1024) {
        var freezHeader = $('#dvg_' + gridId).attr('freezHeader');
        if (!selfCall)
            initGrid(gridId, freezHeader == "true");
        ControlHeader(gridId);
        showhideArrows(gridId);
    } else {
        //gridviewScroll(gridId, 1);
        // showhideArrows(gridId);
        //ControlHeader(gridId);
        $('#' + gridId).gridviewScroll({
            enabled: false
        });

    }
}
function CallSupportingGridResize(gridId) {

    ControlHeader(gridId);
    showhideArrows(gridId);

}
function getRPP(gridId) {
    return $("#ddlPage_" + gridId).val();
}
function getCP(gridId) {
    return $("#pagecount_" + gridId).text();
}
function resetCP(gridId) {
    return $("#pagecount_" + gridId).text('1');
}
function getTP(gridId) {
    return $("#pagetotl_" + gridId).text();
}
function getTR(gridId) {
    return $("#records_" + gridId).text();
}

function getSD(gridId) {
    var col = $("#" + gridId + " th.sorting--asc");
    if (col.length > 0)
        return "asc";
    else {
        col = $("#" + gridId + " th.sorting--desc");
        if (col.length > 0)
            return "desc";
        else {
            return "";
        }
    }
}
function resetSC(gridId) {
    $("#" + gridId + " th.sorting--asc").removeClass("sorting--asc");
    $("#" + gridId + " th.sorting--desc").removeClass("sorting--desc");
}
function getSC(gridId) {
    var col = $("#" + gridId + " th.sorting--asc, #" + gridId + " th.sorting--desc");
    if (col.length > 0)
        return col[0].getAttribute("sorton");
    else {
        return "";
    }
}
function getGridFilter(gridId) {
    return gridId + ".RecordsperPage=" + getRPP(gridId) + "|" + gridId + ".CurrentPage=" + getCP(gridId) + "|" + gridId + ".SortColumn=" + encodeURIComponent(getSC(gridId)) + "|" + gridId + ".SortDir=" + getSD(gridId);
}

//// ENd of Helper Functions

///Events for Grid
function sortGrid(gridId, sortCol) {
    var col = getSC(gridId);
    if (col == "") {
        $("#" + gridId + ' th[sorton="' + sortCol + '"]').addClass("sorting--asc");
    } else if (col == sortCol) {
        if ($("#" + gridId + ' th[sorton="' + sortCol + '"]').hasClass("sorting--asc")) {
            $("#" + gridId + ' th[sorton="' + sortCol + '"]').removeClass("sorting--asc").addClass("sorting--desc");
        } else {
            $("#" + gridId + ' th[sorton="' + sortCol + '"]').removeClass("sorting--desc").addClass("sorting--asc");

        }
    } else {
        $("#" + gridId + " th.sorting--asc, #" + gridId + " th.sorting--desc").removeClass("sorting--desc").removeClass("sorting--asc");
        $("#" + gridId + ' th[sorton="' + sortCol + '"]').addClass("sorting--asc");

    }
    resetCP(gridId);
    updateGrid(gridId);
}
function ExportAllGrid(gridId) {
    var widgetUrl = $('#dvg_' + gridId).attr('widgeturl');
    var filterCallback = $('#dvg_' + gridId).attr('filterfunction');
    if (widgetUrl !== "") {
        widgetUrl = widgetUrl.replace('Refresh', 'ExportAllToExcel');
        widgetUrl = widgetUrl.replace('TextAnalytics/CommentListPageChange', 'Report/ExportAllToExcel'); // This change is only for text analytics comment list page
        var filter = "";
        if (filterCallback && filterCallback != "null") {
            filter = eval(filterCallback + "();");
        } else
            filter = getGridFilter(gridId);
        filter += "|" + gridId + ".RecordsperPage=" + getTR(gridId) + "|" + gridId + ".CurrentPage=1";
        widgetUrl += '|' + escape(filter);
        window.location.href = widgetUrl;
    }

}
function updateGrid(gridId, fromPaging) {

    var widgetUrl = $('#dvg_' + gridId).attr('widgeturl');
    var filterCallback = $('#dvg_' + gridId).attr('filterfunction');
    var loUniqueModifier = '|guid=' + guid();
    if (widgetUrl !== "") {
        var filter = "";
        if (filterCallback && filterCallback != "null") {
            filter = eval(filterCallback + "(" + fromPaging + ");");
        } else
            filter = getGridFilter(gridId);
        widgetUrl += '|' + escape(filter) + loUniqueModifier;
        widgetUrl = widgetUrl.replace("+", encodeURIComponent("+"));
        $('.loader-overlay').show();
        $("#dvg_" + gridId).load(widgetUrl + " #dvg_" + gridId, function(e) {
            $('.loader-overlay').hide();
            var freezHeader = $('#dvg_' + gridId).attr('freezHeader');
            initGrid(gridId, freezHeader == "true");
            $('.selectpicker').selectpicker();
            //$('.responseToolTip').removeClass('nw');
            $(".responseToolTip .response").tooltip({
                tooltipClass: "response--tooltip",
                position: {
                    my: "left+15 top-5",
                    at: "right top",
                    using: function(position, feedback) {
                        $(this).css(position);
                        $(this)
                            .addClass("arrow")
                            .addClass(feedback.vertical)
                            .addClass(feedback.horizontal);
                    }
                },
                content: function() {
                    return $(this).children('.responseToolTipContent').html();
                },
                open: function(event, ui) {
                    if (typeof (event.originalEvent) === 'undefined') {
                        return false;
                    }
                    var $id = $(ui.tooltip).attr('id');
                    $('div.ui-tooltip').not('#' + $id).remove();
                },
                close: function(event, ui) {
                    ui.tooltip.hover(function() {
                        $(this).stop(true).fadeTo(400, 1);
                    },
                        function() {
                            $(this).fadeOut('400', function() {
                                $(this).remove();
                            });
                        });
                }
            });
        });
    }


}



function ddlPageChange(gridId) {
    $("#pagecount_" + gridId).text("1");
    updateGrid(gridId);
}

function changePage(gridId, diff) {
    var currentPage = parseInt($("#pagecount_" + gridId).text());
    var totalPage = parseInt($("#pagetotl_" + gridId).text());
    var result = currentPage + diff;
    if (result == 0 || result > totalPage)
        return false;
    $("#pagecount_" + gridId).text(result);
    updateGrid(gridId, true);
    return true;
}
// ENd of Events


//Freezing relevent functions
function gridviewScroll(girdName, freezeCol) {

    $(("#" + girdName)).gridviewScroll({

        freezesize: freezeCol
    });
}



function FreezeGrid(gridId) {
    var freezeCol = parseInt($("#hidden_" + gridId).val());
    callGridViewScroll(gridId, freezeCol);
    scrollArrow(gridId);
    // $(".toolTip p").mCustomScrollbar();

    // $('#' + gridId + 'PanelHeaderContentFreeze').width($('#' + gridId + 'Freeze').width());
    //$('#' + gridId + 'Copy').width($('#' + gridId + '').width());

    $("#" + gridId + " tr:last .ico-comments").next().addClass("lastRowTooltip");

    $(".ico-comments").mouseenter(function() {
        $(".ico-comments").next().hide();
        $(".arrow_wrap").hide();
        $(this).next().show();
        if (!$(this).next().children().first().hasClass("mCS_no_scrollbar")) {
            $(this).next().children().first().mCustomScrollbar();
        }

        {
            $(".toolTip p").each(function() {
                $(this).mCustomScrollbar("update");
            });
        }

    });
    $('.ui-draggable.ui-draggable-handle').hide();

    $("td").hover(function(e) {
        if ($(e.target).parents(".ico-comments").length || $(e.target).hasClass("ico-comments") || $(e.target).parents(".arrow_wrap").length || $(e.target).hasClass("arrow_wrap")) {
            return;
        }
        //alert($(e.target).attr("class"));
        $(".arrow_wrap").show();
        $(".ico-comments").next().hide();
    });


}


var scrolling = null;
function callGridViewScroll(gridId, freezeCol) {
    //$("#" + gridId + " td[title], #" + gridId + " th[title]").each(function () {
    //    this.setAttribute("tooltiptext", this.getAttribute("title"));
    //    this.removeAttribute("title"); // to show tooltip
    //});
    gridviewScroll(gridId, freezeCol);
    showhideArrows(gridId);
    $(("#scrollleft_" + gridId)).bind("mouseover", function(event) {
        scrolling = true;
        scrollContent("left", gridId);
    }).bind("mouseout", function(event) {
        scrolling = false;
    });


    $(("#scrollright_" + gridId)).bind("mouseover", function(event) {
        scrolling = true;

        scrollContent("right", gridId);
    }).bind("mouseout", function(event) {
        scrolling = false;
    });


    $("#" + gridId + " td[tooltiptext], #" + gridId + " th[tooltiptext]").hover(function() {
        onHoverTooltip(this);
    },
        function() {
            removeTooltip();
        });
}
function scrollContent(direction, divName) {

    var amount = (direction === "left" ? "-=10px" : "+=10px");

    $(("#" + divName + "PanelItemContent")).animate({
        scrollLeft: amount
    }, 1, function() {
        $(("#" + divName + "PanelHeaderContent")).animate({
            scrollLeft: amount
        }, 1, function() {
            if (scrolling) {
                scrollContent(direction, divName);
            }
        });
    });
    showhideArrows(divName);

}
function isSafari() {
    return /^((?!chrome).)*safari/i.test(navigator.userAgent);
}
function showhideArrows(divName) {

    if (navigator.userAgent.indexOf('Mac') > 1 && (divName == "EmailEditListingGrid" || divName == "MyAppealListingGrid" || divName == "AppealListingGrid") && isSafari()) {
        // isSafari 
        $("#scrollleft_" + divName).css("visibility", "visible");
        $("#scrollright_" + divName).css("visibility", "visible");
        
        
    }
    else {
        //other browser 


        if ($(("#" + divName + "PanelItemContent")).scrollLeft() < 10) {
            $("#scrollleft_" + divName).css("visibility", "hidden");
        }
        else {
            $("#scrollleft_" + divName).css("visibility", "visible");
        }

        var totalWidth = $("#" + divName + "Wrapper").width();
        $("#scrollDiv_" + divName).width(totalWidth);

        var divscrollLeft = $(("#" + divName + "PanelItemContent")).scrollLeft();
        if (((totalWidth + divscrollLeft) + 1) >= $("#" + divName + "").width()) {
            $("#scrollright_" + divName).css("visibility", "hidden");
        }
        else {
            $("#scrollright_" + divName).css("visibility", "visible");
        }
    }

    //if (window["Filter-1_ObjectFilter"].ReportCode == "Dashboard" && divName == "SurveyWidgetGrid") {
    //    $("#scrollleft_SurveyWidgetGrid").css("visibility", "hidden");
    //    $("#scrollright_SurveyWidgetGrid").css("visibility", "hidden");
    //}

}
function ControlHeader(gridId) {
    var windowTop = $(window).scrollTop();
    var stickyTop = 0;
    if ($("#dvg_" + gridId).offset() != null) {
        stickyTop = $(".iSKYGrid").offset().top;
    }
    var MenuHeight = $('#topMenuParent').height();
    var FilterHeight = 0;
    if (document.getElementsByClassName('filter').length > 0) {
        FilterHeight = $('.filter').height();
    }
    var GridStickyHeight = MenuHeight + FilterHeight;
    if ((windowTop + GridStickyHeight > stickyTop)) //Check if from top the distance is greater then 580 then fix the header
    {

        $("#" + gridId + "PanelHeader").css({ position: "fixed", 'top': GridStickyHeight, 'width': $('#' + gridId + 'Wrapper').width() + 'px', 'z-index': "14" }); //Fix the datagrid position 

    }
    else {

        $("#" + gridId + "PanelHeader").css({ position: "relative", 'top': "0", 'overflow': "hidden" });

    }

}
function WindowScroll(gridId) {
    ControlHeader(gridId);
    scrollArrow(gridId);

    $("#" + gridId + "VerticalRail").css("display", "none");
}
function scrollArrow(gridId) {

    //var paneHeight = $("#dvg_" + gridId).height();

    //var windowTop = $(window).scrollTop();

    //var viewArea = $(window).height();


    //var stickyTop = 0;
    //if ($("#dvg_" + gridId).offset() != null) {
    //    stickyTop = $("#dvg_" + gridId).offset().top;
    //}
    ////  console.log(windowTop + '-' + stickyTop);
    //var toppadding = 0;
    //if ((windowTop) > stickyTop + $("#dvg_" + gridId).closest('.widget').offset().top) {
    //    toppadding = (windowTop - stickyTop - $("#dvg_" + gridId).closest('.widget').offset().top) + viewArea / 2;
    //    toppadding = toppadding;
    //}
    //else {

    //    if (paneHeight > 200) {
    //        if (paneHeight < 300) {

    //            toppadding = stickyTop + 90;
    //        }
    //        else if (paneHeight < 400) {
    //            toppadding = paneHeight / 2 + stickyTop - 30;
    //        }
    //        else {
    //            toppadding = viewArea / 2 + 80;

    //        }
    //    } else {
    //        if (paneHeight <= 100) {
    //            toppadding = stickyTop + 40;

    //        }
    //        else {

    //            toppadding = stickyTop + 40;

    //        }
    //    }
    //}
    //if (toppadding < 0) {
    //    toppadding = 0;
    //}

    var windowTop = $(window).scrollTop();
    var stickyTop = 0;
    if ($("#dvg_" + gridId).offset() != null) {
        stickyTop = $(".iSKYGrid").offset().top;
    }

    if ((windowTop > stickyTop)) //Check if from top the distance is greater then 580 then fix the header
    {
        if ($('#' + gridId + " tr").length <= 1) {
            $("#scrollDiv_" + gridId).css({ display: "none" });
        } else {
            $("#scrollDiv_" + gridId).css({ display: "" });

        }
        if ($('#' + gridId + " tr").length < 5) {
            $("#scrollDiv_" + gridId).css({ position: "fixed", 'top': 170, 'z-index': '15' });

        }
        else {
            $("#scrollDiv_" + gridId).css({ position: "fixed", top: 205, 'z-index': '15' }); //Fix the datagrid position 
        }
    }
    else {
        if ($('#' + gridId + " tr").length < 5) {
            $("#scrollDiv_" + gridId).css({ position: "relative", 'top': 60 });

        } else {
            $("#scrollDiv_" + gridId).css({ position: "relative", 'top': 155 });

        }

    }

    if ($('#' + gridId + ' tr').length > 1) {
        $("#scrollDiv_" + gridId).removeClass("hide");
    }
    else {
        $("#scrollDiv_" + gridId).addClass("hide");
    }

    //$("#scrollDiv_" + gridId).css("top", toppadding);
    //$("#scrollDiv_" + gridId).css("position", "absolute");

    $("#scrollleft_" + gridId).css("left", ($("#" + gridId + "PanelHeaderContentFreeze").width() + 20) + "px");

    //if (window["Filter-1_ObjectFilter"].ReportCode == "Dashboard" && gridId == "SurveyWidgetGrid") {
    //    $("#scrollleft_SurveyWidgetGrid").css("visibility", "hidden");
    //    $("#scrollright_SurveyWidgetGrid").css("visibility", "hidden");
    //}
}
function SplitTable(tbl, fixedcolumns, maxCols, pageBreakCountFirtPage, normalPageBreak, showBodyTag) {
    if (typeof (showBodyTag) === 'undefined') showBodyTag = false;
    if ($(tbl).find('tr').length == 1)
        return $(tbl)[0].outerHTML;
    var actualcol = 0;
    var findBody = showBodyTag == true ? 'tbody tr:first' : 'tr:first';
    actualcol = $(tbl).find(findBody).find('td, th').length;
    var pagestart = fixedcolumns;
    var mainhtml = "<div>";
    var pageEnd = 0;
    do {
        pageEnd = pagestart + maxCols;
        var newtable = "<div class='table' style='margin-top:10px;background-color:white;'>" + tagHTML(tbl);
        newtable = newtable.replace("width:100%", "width:1000px !important");
        var introw = 1;
        var tagname = "";
        $(tbl).find('tr').each(function() {
            var flag = false;
            if (pageBreakCountFirtPage > 0)
                if (introw == pageBreakCountFirtPage || ((introw - pageBreakCountFirtPage) % normalPageBreak == 0)) {
                    addPageBreak(this);
                    flag = true;
                }
            newtable += tagHTML(this).replace('none', '');
            if (flag) {
                RemovePageBreak(this);
            }
            introw += 1;
            var index = 0;

            var cols = $(this).find('td, th');
            for (index = 0; index < fixedcolumns; index++)
                newtable += tagHTML(cols[index]) + ($(cols[index]).find('.GridCellDiv').length > 0 ? $(cols[index]).find('.GridCellDiv').html() : $(cols[index]).html()) + "</" + cols[index].tagName + ">";
            for (index = pagestart; index < pageEnd && index < cols.length; index++)
                newtable += tagHTML(cols[index]) + ($(cols[index]).find('.GridCellDiv').length > 0 ? $(cols[index]).find('.GridCellDiv').html() : $(cols[index]).html()) + "</" + cols[index].tagName + ">";

            //if (!($("#report-code") && $("#report-code").val().toLowerCase() == "orgsummary")) {
            //    for (; index < pageEnd && fixedcolumns + maxCols < cols.length; index++)
            //        newtable += "<" + cols[0].tagName + ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</" + cols[0].tagName + ">";
            //}

            newtable += "</tr>";
        });
        newtable += "</table></div>";
        mainhtml += newtable;
        pagestart = pageEnd;
    } while (pagestart < actualcol);
    return mainhtml + "</div>";
}

function addPageBreak(tr) {
    $(tr).css('page-break-before', 'always');
}

function RemovePageBreak(tr) {
    $(tr).css('page-break-before', '');
}
// end of Freezing functions

function ExportAllOrgGrid() {
    var widgetUrl = $('#dvg_OrgGrid').attr('widgeturl');
    var filterCallback = $('#dvg_OrgGrid').attr('filterfunction');
    if (widgetUrl !== "") {
        widgetUrl = widgetUrl.replace('Refresh', 'ExportAllToExcel').replace('CommentListPageChange', 'ExportAllToExcel');
        var filter = "";
        if (filterCallback && filterCallback != "null") {
            filter = eval(filterCallback + "();");
        } else
            filter = getGridFilter('OrgGrid');
        filter += "|OrgGrid" + ".RecordsperPage=" + getTR('OrgGrid') + "|OrgGrid" + ".CurrentPage=1" + "|ExportAll=1";
        widgetUrl += '|' + escape(filter) + '&exportAllDataSetInOneSheet=true';
        window.location.href = widgetUrl;
        $('#report-loader').hide()
    }

}