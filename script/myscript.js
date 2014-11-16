var viz, workbook, activeSheet;


$(document).ready(function(){

	var intro = $('#intro');
	var analysis = $('#analysis');
	
	var placeholderDiv = document.getElementById("tableauViz");
	var url = "http://public.tableausoftware.com/views/ProjectDemandvsSkillCapacity/Dashboard1";
	var options = {
		hideTabs: true,
		width: "1100px",   
		height: "700px",
		onFirstInteractive: function () {
			workbook = viz.getWorkbook();
			activeSheet = workbook.getActiveSheet();
		} 
	};
	var viz = new tableauSoftware.Viz(placeholderDiv, url, options);

	function filterScenario(scenario) {
		var actualSheet;
		if(activeSheet.getSheetType()==='worksheet'){
			actualSheet=activeSheet;	
		}
		else {
			actualSheet=activeSheet.getWorksheets()[0];
		}
		actualSheet.applyFilterAsync(
		"Scenario",
		scenario,
		tableauSoftware.FilterUpdateType.REPLACE);	
		
	}   

	$('.scenario-button').on('click', function(e){
		// e.preventDefault();
		$('.scenario-button').removeClass('active');
		$(this).addClass('active')
		filterScenario($(this).text());

	});

	function showSection(show, hide) {
		$(hide).fadeOut(700).promise()
		.done(function(){
			$(show).slideDown(500);	

		});

		if (show === $('#intro')){
			$('.intro-link').addClass("active").siblings("li").removeClass("active");


		}
		else {
			$('.analysis-link').addClass("active").siblings("li").removeClass("active");
	
		}
		

	}


	$('.button-intro').on('click', function(e){
		e.preventDefault();
		showSection(analysis, intro);
		
	});


	$('.intro-link').on('click', function(e){
		e.preventDefault();
		showSection(intro, analysis);
	
	});


	$('.analysis-link').on('click', function(e){
		e.preventDefault();
		showSection(analysis, intro);
	
		
	});


});

