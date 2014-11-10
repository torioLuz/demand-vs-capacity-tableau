var viz, workbook, activeSheet;


$(document).ready(function(){

	
	var placeholderDiv = document.getElementById("tableauViz");
	var url = "http://public.tableausoftware.com/views/ProjectDemandvsSkillCapacity/Dashboard1";
	var options = {
		hideTabs: true,
		width: "800px",   
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

});

