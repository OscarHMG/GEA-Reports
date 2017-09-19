	window.onload = loadReportServerTimeResponses; //inicio del script
 
	function loadReportServerTimeResponses()
	{
  		//Se instancia un objeto del tipo ws_ReportsGea que se encuentra en la carpeta /view/libs   
 		var ws_ReporteDevices = new ws_ReportsGea();
		ws_ReporteDevices.setAccion("GET_SERVER_RESPONSE_TIME");
		ws_ReporteDevices.setArgumentos({"fecha":"2017-09-14","contexto":"saludos-plusservice"});
		ws_ReporteDevices.OnResponde = function(answ)
		{
			//Cuando la respuesta es exitosa se almacena en un array
			console.log(answ);
			if(answ)
				ARRAY_ACTIVIDAD_TOTAL=answ;
        	else
				ARRAY_ACTIVIDAD_TOTAL=[];
			//La tabla se lenará en el tpl.php dependiendo del nombre de los campos que vengan en el JSON
        	jQuery('#tblServerTimeResponse').bootstrapTable('load',ARRAY_ACTIVIDAD_TOTAL);
	
			//_closeDialog(); 
		};
		ws_ReporteDevices.OnError = function(error)
		{
    		console.log(error);
		};
		ws_ReporteDevices.consultarHttp();
		//_openDialogSpinner("Cargando Reporte");
 	}