$(document).ready(function() {
   logger('init: START ');
   $('#statsTable').hide();
   $('#statsButton').click(getStats);
}); // init function 

function getStats(str)
{
    $.get('/GetStats',{},function(res){
        logger('getStats: res.totalRecords ' + res.totalRecords);
        $('#earliestDate').html(res.earliestDate);
        $('#latestDate').html(res.latestDate);
        $('#totalRecords').html(res.totalRecords);
        $('#totalSpent').html(res.totalSpent);
        $('#totalStores').html(res.totalStores);
        $('#statsTable').show();
    },'json');
} // getStats

function logger(str)
{
    if(window.console && console.log) console.log('WAE: ' + str);
} // logger

