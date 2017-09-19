//{"funcion":"GET_MOST_ANSWERED_QUESTIONS","args":{"fechaInicio":"2017-09-14","fechaFin":"2017-09-16"}}


//---------------------Funciones de consulta-------------

	window.onload = loadReportMostAnsweredQuestion; //inicio del script
 
	function loadReportMostAnsweredQuestion()
	{
  		//Se instancia un objeto del tipo ws_ReportsGea que se encuentra en la carpeta /view/libs   
 		var ws_ReporteDevices = new ws_ReportsGea();
		ws_ReporteDevices.setAccion("GET_MOST_ANSWERED_QUESTIONS");
		ws_ReporteDevices.setArgumentos({"fechaInicio":"2017-09-14","fechaFin":"2017-09-16"});
		ws_ReporteDevices.OnResponde = function(answ)
		{
			//Cuando la respuesta es exitosa se almacena en un array
			console.log(answ);
			if(answ)
				ARRAY_ACTIVIDAD_TOTAL=answ;
        	else
				ARRAY_ACTIVIDAD_TOTAL=[];
			//La tabla se lenará en el tpl.php dependiendo del nombre de los campos que vengan en el JSON
        	jQuery('#tblMostAnsweredQuestions').bootstrapTable('load',ARRAY_ACTIVIDAD_TOTAL);
	
			//_closeDialog(); 
		};
		ws_ReporteDevices.OnError = function(error)
		{
    		console.log(error);
		};
		ws_ReporteDevices.consultarHttp();
		//_openDialogSpinner("Cargando Reporte");
 	}