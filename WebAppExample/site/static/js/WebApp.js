$(document).ready(function() {
   logger('init: START ');

   MesgDialog = $('#dialog-mesg').dialog({
      autoOpen: false
      ,height: 300
      ,width: 350
      ,modal: true
   });
}); // init function 

function logger(str)
{
    if(window.console && console.log) console.log('WAE: ' + str);
} // logger

