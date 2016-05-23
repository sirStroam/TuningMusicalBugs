$("#browserwarning").hide();
if($.browser.mozilla)
{
    $("#browserwarning").show();
}

$("#closewarning").click(function() {
    
    $("#browserwarning").hide();
    
})