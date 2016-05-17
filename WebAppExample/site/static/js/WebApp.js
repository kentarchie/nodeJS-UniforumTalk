var OutputDateFormat = 'YYYY-MM-DD';
var InputDateFormat = 'yy-mm-dd';
var DB_DATE  = 'date';
var DB_STORE = 'store';
var DB_ITEM  = 'item';
var DB_PRICE = 'price';

$(document).ready(function() {
   logger('init: START ');
   $('#statsTable').hide();
   $('#itemsTable').hide();
   $('.rightSide').hide();
   $('#statsButton').click(getStats);
   $('#dataButton').click(getItemsByDate);
}); // init function 

function getStats(str)
{
    $.get('/GetStats',{},function(res){
        logger('getStats: res.totalRecords ' + res.totalRecords);
        var startDateString = moment(res.earliestDate).format(OutputDateFormat);
        var endDateString   = moment(res.latestDate).format(OutputDateFormat);
        $('#earliestDate').html(startDateString);
        $('#latestDate').html(endDateString);
        $('#totalRecords').html(res.totalRecords);
        $('#totalSpent').html(parseFloat(res.totalSpent).toFixed(4));
        $('#totalStores').html(res.totalStores);
        $('#statsTable').show();
        setupDates();
    },'json');
} // getStats

function setupDates()
{
   $('.rightSide').show();
   logger('setupDates: moment: from stats=:'+$('#earliestDate').html()+':');
   var startDateString = moment($('#earliestDate').html(),OutputDateFormat).format(OutputDateFormat);
   var endDateString = moment($('#latestDate').html(),OutputDateFormat).format(OutputDateFormat);
   logger('setupDates: moment: startDateString=:'+startDateString+': endDateString=:'+endDateString+':');
   $('#fromDate').datepicker()
       .datepicker( "option", "dateFormat", InputDateFormat)
       .datepicker({
         "changeYear" : true
         ,"changeMonth" : true
       })
       .datepicker( "setDate" , startDateString)
   $('#toDate').datepicker()
       .datepicker( "option", "dateFormat", InputDateFormat)
       .datepicker({
         "changeYear" : true
         ,"changeMonth" : true
       })
       .datepicker( "setDate" , endDateString)
} // setupDates

function getItemsByDate(str)
{
    var startDate = $('#fromDate').val();
    var endDate = $('#toDate').val();
    var url = 'GetItems/dates/'+startDate+'/'+endDate;
    $.get(url,{},function(res){
        logger('getItemsByDate: res.length ' + res.length);
        makeTable(res);
    },'json');
} // getItemsByDate

function makeTable(data)
{
    logger('makeTable: START');
    logger('makeTable: data.length=:'+data.length+':');
    var outList = [];
    for(var row=0,rowL=data.length; row<rowL; ++row) {
        var dValue = data[row];
        outList.push('<tr>');
        outList.push('<td>'+moment(dValue[DB_DATE]).format(OutputDateFormat)+'</td>');
        outList.push('<td>'+dValue[DB_STORE]+'</td>');
        outList.push('<td>'+dValue[DB_ITEM]+'</td>');
        outList.push('<td>'+dValue[DB_PRICE]+'</td>');
        outList.push('</tr>');
    }
    logger('makeTable: outList made');
    $('#itemsTBody').html(outList.join(''));
    $('#itemsTable').fixedHeaderTable({ 
         height : '250'
         ,width : '600'
         ,themeClass : 'defaultTheme'
    });
    
    $('#itemsTable').show();
    logger('makeTable: after table make');
} // makeTable

function logger(str)
{
    if(window.console && console.log) console.log('WAE: ' + str);
} // logger

