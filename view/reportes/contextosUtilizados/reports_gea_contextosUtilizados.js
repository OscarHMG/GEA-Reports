
//---------------------Funciones de consulta-------------

	window.onload = cargarReportePlan; //inicio del script
 
 	var idpromocion="";
	 //Al momento que se carga la pantalla se manda a consultar el web service 
	function cargarReportePlan()
	{
  		//Se instancia un objeto del tipo ws_ReportsGea que se encuentra en la carpeta /view/libs   
 		var ws_ReporteDevices = new ws_ReportsGea();
		ws_ReporteDevices.setAccion("GET_MOST_USED_CONTEXTS");
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
        	jQuery('#tblContextosUtilizados').bootstrapTable('load',ARRAY_ACTIVIDAD_TOTAL);
	
			//_closeDialog(); 
		};
		ws_ReporteDevices.OnError = function(error)
		{
    		console.log(error);
		};
		ws_ReporteDevices.consultarHttp();
		//_openDialogSpinner("Cargando Reporte");
 	}
	

	/*function consultarReportePromociones()
	{
		//"args":{"fechaInicio":"2017-09-14","fechaFin":"2017-09-16"}
		var args = {"fechaInicio":"2017-09-14","fechaFin":"2017-09-16"};
		var ws_AddParada = new ws_ReportsGea();
		ws_AddParada.setAccion('GET_MOST_USED_CONTEXTS');
		ws_AddParada.setArgumentos(args);		
		ws_AddParada.OnResponde = function(answ)
		{
			idpromocion=parseInt(answ[0].ID_PROMOCION);
			           
        };
		ws_AddParada.OnError = function(error)
		{	
 			console.log(error);
		};
		ws_AddParada.consultarHttp();
 	}*/





	