	window.onload = loadReportQuestionsByContext; //inicio del script
 
	function loadReportQuestionsByContext()
	{
  		//Se instancia un objeto del tipo ws_ReportsGea que se encuentra en la carpeta /view/libs   
 		var ws_ReporteDevices = new ws_ReportsGea();
		ws_ReporteDevices.setAccion("GET_QUESTIONS_BY_CONTEXTS");
		ws_ReporteDevices.setArgumentos({"contexto":"saludos-plusservice","fechaInicio":"2017-09-14","fechaFin":"2017-09-16"});
		
		ws_ReporteDevices.OnResponde = function(answ)
		{
			//Cuando la respuesta es exitosa se almacena en un array
			console.log(answ);
			if(answ)
				ARRAY_ACTIVIDAD_TOTAL=answ;
        	else
				ARRAY_ACTIVIDAD_TOTAL=[];
			//La tabla se lenará en el tpl.php dependiendo del nombre de los campos que vengan en el JSON
        	jQuery('#tblQuestionsByContext').bootstrapTable('load',ARRAY_ACTIVIDAD_TOTAL);
	
			//_closeDialog(); 
		};
		ws_ReporteDevices.OnError = function(error)
		{
    		console.log(error);
		};
		ws_ReporteDevices.consultarHttp();
		//_openDialogSpinner("Cargando Reporte");
 	}