        $(document).ready(function () {

            $(".howto").hide();
            
            var toNum = function (e) {
                switch (e.toString().toLowerCase()) {
					case "welcome":
						return 0;
					case "howto":
						return 1;
					case "pitch_input":
						return 2;
					case "pitch_mapping":
						return 3;
					case "duration_input":
						return 4;
					case "duration_mapping":
						return 5;
					case "scale_options":
						return 6;
                    case "play":
                        return 7;
                }
            };



            /* Change the views of the voices (Have tabbed or full view) */
            $("#options ul li a").on('click', function (e) {
                e.preventDefault(); // Stop Link from going anywhere

                switch ($(this).attr("id")) {
                case "tab":

                    var voices = parseInt($("#welcomeChoice").val(), 10);
                    var $wrap = $("#tabs_container");
                    $wrap[0].innerHTML = "";

                    for (var i = 1; i < voices + 1; i++) // Add the voices tabs depends on number of voices
                    {
                        var tab = "<a href='' id='tab_" + i + "'>Voice " + i + "</a>"; // Create Link with Voice Number

                        $wrap.append(tab); // Append it to Tabs Container
                    }

                    $wrap.find("a").on("click", function (e) // If Voice link is clicked in Tab Container
                        {
                            e.preventDefault();

                            var voice = parseInt(this.id.substring(4, this.id.length), 10); // Get Number of Voices

                            $("#content").find("div").each(function (e) // Find immediate content divs
                                {
                                    if ($(this).attr("class") != "tab_view well well-sm" && $(this).attr("class") != "full_view well well-sm")
                                        return;

                                    $(this).attr("class", "tab_view well well-sm"); // Change class to tab_view
                                    $(this).hide(); // Hide all the voices
                                });

                            $("#content div[id*=" + voice + "]").show(); // Show the voice of voice selected
                        });

                    $wrap.find("a")[0].click();

                    var curMenu = $(".menu_active")[0].innerHTML; // Get the current "window"

                    if (curMenu != "Welcome" && curMenu != "Play")
                        $wrap.css("visibility","visible"); // Show tabs, if tabbed view but not in Welcome, Scale Options, and Play

                    break;
                case "full":
                    $("#tabs_container").css("visibility","hidden"); // Hide the tab links

                    $("#content").find("div").children(".tab_view").each(function () {
                        $(this).attr("class", "full_view well well-sm"); // Change class to full_view style
                        $(this).attr("style", "display: inline-block;");
                    });
                    break;
                }
            });





            /* Content Switcher */
            $('#menu').find("li a").on('click', function (e, option) // Add Click Events to menu links
                {
                    e.preventDefault(); // Prevent default link actions
                    
                    var EXTREME_NUM = 3000;

                    if ($(this).attr("class") == "menu_active") // Bail if this link is already active
                        return;

                    $('#menu').find(".menu_active").removeClass(); // Remove previous active link

                    $(this).addClass("menu_active"); // Make menu link active

                    $("#content > div").each(function () {
                        if ($(this).prop('style').length == 0)
                            direction = this.className;
                    });

                    var parentID = this.id; // Get the id of this link

                    /* Push the menu item that has been clicked on to the history */
                    if (option === undefined) // If not already in the history, push the current state.
                        history.pushState({
                            name: parentID
                        }, "Music Algorithms", "#" + parentID);

                    /* Determine the direction of the animation */
                    direction = (toNum(direction) < toNum(parentID)) ? -EXTREME_NUM : EXTREME_NUM;


                    /*
                     * Switch the content views. Hide all divs but the button clicked and animate slide
                     */
                    
                    $("#content_container").transition({
                        x: direction
                    }, 250, "linear", function () {
                        
                        $(".saveMidi").remove();
                        
                        $("#content").children("div").each(function (i) {
                            
                            if (this.className == parentID) {
                                $(this).removeAttr("style"); // Show Content

                                if ($(".tab_view").length > 0 && parentID != "welcome" && parentID != "play")
                                {
                                    $("#tabs_container").css("visibility","visible"); //Show Tabs if Tab view is enabled
                                    
                                } else {
                                    if(parentID === "play")
                                    {
                                        $("#options_buttons").find("button").each(function() {
                                            $(this).hide();   
                                        });
                                        
                                        $("#options_buttons").append('<input type="submit" style="position: absolute; right: 0px; margin: 3px;" value="Save Midi File" onClick="downloadMidi()" class="btn btn-primary saveMidi">');
                                    } else {
                                       $("#options_buttons").find("button").each(function() {
                                            $(this).show();   
                                        }); 
                                    }
                                    $("#tabs_container").css("visibility","hidden");
                                }
                            } 
                            else {
                                $(this).attr("style", "display:none;"); // Hide Content
                            }
                        });

                        direction *= -1;

                        $(this).transition({
                            x: direction
                        }, 1, "linear", function () {

                            $(this).transition({
                                x: 0
                            }, 250, "linear");
                        });
                    });
                });




            /* Handle History Tabs - ( When going back or forward in the history, pop the tab that was viewed.) */
            window.addEventListener("popstate", function (e) {
                var state = e.state;

                if (state !== null)
                    $("#" + state.name).trigger("click", "BlockHistory");
            }); // End Window Event Handler
            
            
            
            /*  Save State */
            
            /* Populate Save Popup */
            $(".save_option").on("click", function() {
                var numVoices = $("#welcomeChoice").val(); // Get Total Number of Voices
		var data = "# Of Voices, Text Area Name, Text Area Data \n";
                data += numVoices+""; // Create array of csv data starting with number of voices

                $("#saveModal textarea").val(""); // Clear save text area
                
                $("textarea").each(function() {
			if($(this).attr("id"))
			{
                    		data += ","+$(this).attr("id");
                   	 	data += ","+$(this).val().replace(/,/g," ");
				data += "\n";
			}
                });
                
                $("#saveModal textarea").val(data); // Insert csv data into save text area
            });
            
            /* Create CSV File */
            $(".save").on("click", function() {
                var data = $("#saveModal textarea").val();
                
                var a = document.createElement('a');
                a.href = encodeURI('data:attachment/csv;charset=utf-8,' + data);
                a.target = '_blank';
                a.download = 'MusicAlgorithms.csv';

                document.body.appendChild(a);
                a.click(); 
                
            });
            
            /* Activate load dialog when Load From CSV is clicked */
            $(".load").on("click", function() {
            	$("#load-upload").click();
            });
            
            /* Actually load in the file once the file is chosen */
            $("#load-upload").on("change", function(e) {
            	var _this = $(this);
            
            	fr = new FileReader();
                  fr.onload = function() {
                  	_this.parent().find("textarea").val(fr.result);
                  };
                  fr.readAsText(this.files[0]);
            });
            
            /* Load in data from textarea to the correct voices in the site */
            $(".btn-loadIn").on("click", function() {
            
            	if($(this).parent().parent().find("textarea").val() !== "")
            	{
				var csv = $(this).parent().parent().find("textarea").val().split(",");
				var voiceNum = csv[2].split(" ")[4].replace(/(\s+)/g,"");
			
				var errorFlag = false;
				
				csv = csv.slice(5, csv.length);
				
				if(!errorFlag)
					$("#welcomeChoice").val(voiceNum).change();

            		for(var t = 0; t < csv.length && errorFlag != true; t += 2)
            		{
            			var _count = 0;
            			var _input = csv[t+1].replace(/\s/g,",");
            			_input = _input.substring(0, _input.length-1);
            			
            			for(var i = 0; i  < _input.length; i++)
            			{
            				if(_input[i] == ",")
            					_count += 1;
            			}
            		
            			var _loc = $("#"+csv[t].replace(/,/g,"")+"");
            		
            			if(_count <= 2000)
            			{
            				_loc.parent().find("select[name='inputSet']").val("Custom");
            				_loc.parent().find("input[id*='note_count']").val(Math.ceil(_input.length/2));
            				_loc.val(_input);
            			
            				updatePitchMapData(_loc, _loc.attr("id").slice(-1));
            				updateDurationMapTooltip(_loc);
            				updatePitchMapTooltip(_loc);
            			}
            			else
            			{
            				errorFlag = true;
            			}
            		}
            	
            		$("#loadModal").modal("hide");
            	
            		if(errorFlag == false)
            		{
            			$("#content").prepend('<div class="load-pop" style="opacity: 0.1; width: 80%; margin: 0 0 20px 10%; box-shadow: 0 0 6px rgba(34, 34, 34, 0.10); background: #FFF; height: 40px; padding: 0px;"><span class="glyphicon glyphicon-ok success" style="width: 10%; height: 100%; font-size: 30px; background: #DFF0D8; text-align: center; color: #ACBDA5; padding-top: 2px; margin-top: -1px;"></span> <span style=" height: 100%; width: 90%; margin-bottom: 20px; padding-left: 10px;">Values Successfully Loaded!</span></div>').find(".load-pop").animate({
            				opacity: "1"
            			}, 1000, function() {
            				$(this).delay(2000).fadeOut();
            			});
            		}
            		else
            		{
            			$("#content").prepend('<div class="load-pop" style="opacity: 0.1; width: 80%; margin: 0 0 20px 10%; box-shadow: 0 0 6px rgba(34, 34, 34, 0.10); background: #FFF; height: 40px; padding: 0px;"><span class="glyphicon glyphicon-remove" style="width: 10%; height: 100%; font-size: 30px; background: #F2DEDE; text-align: center; color: #BFABAB; padding-top: 4px; margin-top: -1px;"></span> <span style=" height: 100%; width: 90%; margin-bottom: 20px; padding-left: 10px;">ERROR: There is an error in the input. Number of voices has to be 1-4, or a note count in the voice might be greater than 2000.</span></div>').find(".load-pop").animate({
            				opacity: "1"
            			}, 1000, function() {
            				$(this).delay(2000).fadeOut();
            			});
            		}
            	}
           	 });
            
            
            $(".morph-accept").on("click", function() {
			var morphData = $(this).parent().parent().find("textarea").val();
			var voice = "#"+$(this).parent().parent().parent().parent().data("voice-num");
            	
			$(voice).find("textarea").val(morphData);
			$(".morph-modal").modal("hide");
            });
            
            
            /* Percentages after morph slider */
            $("[data-slider]")
    .each(function () {
      var input = $(this);
      $("<span>")
        .addClass("output")
        .insertAfter($(this));
    })
    .bind("slider:ready slider:changed", function (event, data) {
      $(this)
        .nextAll(".output:first")
          .html(data.value.toFixed(0)+"%");	
    });
    
    
    $(window).resize(function(){
        update();
    });
    
    $("#mygraph").find("div").css({ width: $("#mygraph").parent().width(), margin: "0px" });
            
        }); // End Document Ready
