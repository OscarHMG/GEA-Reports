/*
ws_miMovistar.js 
version 3.4
fecha 2013-05-20
interlancompu.com
©copyright 2013

 
{
"min_year": 2014,
"max_year": 2014,
"min_month":0,
"max_month":12,
"max_day":30,
"min_day":0
}
*/
var WS_FUNCIONES_DEF = {
	
			
			"GET_ALLCATALOGOS":"GET_ALLCATALOGOS",
			"UPDATE_URLCATALOGO":"UPDATE_URLCATALOGO",
	
			"GET_ALL_DATA_MARCAS":"GET_ALL_DATA_MARCAS",
			"GET_ALLTIPOSMARCAS":"GET_ALLTIPOSMARCAS",  //obtiene objeto tipo de marcas
			"GET_ALLMARCAS":"GET_ALLMARCAS",			//obtiene todas las marcas guardadas
			"GET_ALLURLPINS":"GET_ALLURLPINS",			//obtiene todas las imagenes guardas
			
			"SET_MARCA":"SET_MARCA",
			"DELETE_MARCA":"DELETE_MARCA",
			
			//REPORES
			"GET_ALLDEVICES":"GET_ALLDEVICES",
			"GET_ALLDEVICES_DETAILED":"GET_ALLDEVICES_DETAILED",
			
			"GET_REPORTE_EVOLUIVO":"GET_REPORTE_EVOLUIVO",
			"GET_REPORTE_MES":"GET_REPORTE_MES",
			"GET_REPORTE_HORA":"GET_REPORTE_HORA",
			"GET_REPORTE_RENDIMEINTO" :"GET_REPORTE_RENDIMEINTO",
			
			"GET_MAX_CHATS" :"GET_MAX_CHATS",
			"UPDATE_MAX_CHATS" :"UPDATE_MAX_CHATS",
			"GET_REPORTE_ACTON_MINES" :"GET_REPORTE_ACTON_MINES",
 			"GET_PUSH_TOKENS":"GET_PUSH_TOKENS",
 			"SEND_PUSH_NOTIFICATIONS": "SEND_PUSH_NOTIFICATIONS",
 			"GET_PUSH_CONFIGURATIONS": "GET_PUSH_CONFIGURATIONS",
 			"UPDATE_PUSH_CONFIGURATIONS": "UPDATE_PUSH_CONFIGURATIONS",
 			"GET_PUSHCAMP_DETAIL" : "GET_PUSHCAMP_DETAIL",
 
};

 
function ws_ReportsGea(){
	this.http = new XMLHttpRequest();
	this.http.ws_gui_idm = this;
	//this.argumentos.funcion = WS_FUNCIONES_DEF.GUI_IDM_OBTIENE_DATOS;
	this.argumentos.args = {};
	
}
ws_ReportsGea.prototype.argumentos = {};
ws_ReportsGea.prototype.resultado = {};
//ws_ReportsGea.prototype.url = "http://drupallocal/reports_gea";
ws_ReportsGea.prototype.url = window.location.origin+"/drupal/reports_gea";
//ws_miMovistar.prototype.url = window.location.origin+"/OTT250934/gui_miMovistar/Mad_AppMiMovistar";
//ws_miMovistar.prototype.url = "http://10.112.157.164:8080/Mad_AppMiMovistar";
ws_ReportsGea.prototype.http = null;
ws_ReportsGea.prototype.Asincronico = true;



 ws_ReportsGea.prototype.consultarHttp = function(){
	//ensero el resultado
	this.resultado ={};
	//prepado los parametros que se envian a el ws
	var strparams = "PARAM=" +encodeURIComponent(JSON.stringify(this.argumentos));
	//prepado las funciones de respuesta
	this.http.onreadystatechange = this.ws_gui_idm_handle_json; //ok
	this.http.onerror = this.ws_gui_idm_handle_json_error; //error
	
	//abro la url
	this.http.open("POST", this.url, this.Asincronico);
	
	
	//aplico el hear que indica que voy a envia un paramtro past
	this.http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
	//encodificacion de información para poder mandas simbolo +

	//envio el parametro post con el json y le dijo que consulte el resultado
	this.http.send(strparams);
	//this.http.send(strparamEncoded);
	

};
//aqui entra el resultado ok;
 ws_ReportsGea.prototype.ws_gui_idm_handle_json = function(){
	if (this.ws_gui_idm.http.readyState == 4) {
		if (this.ws_gui_idm.http.status == 200) {
			var json_data = this.ws_gui_idm.http.responseText;
			
			try{
				
				this.ws_gui_idm.resultado = eval("(" + json_data + ")");
				
				var tipo = jQuery.isArray(this.ws_gui_idm.resultado);
				if (jQuery.isArray(this.ws_gui_idm.resultado)) {
					if( this.ws_gui_idm.resultado[0]=="ERROR")
						this.ws_gui_idm.OnError(this.ws_gui_idm.resultado);
					else
						this.ws_gui_idm.OnResponde(this.ws_gui_idm.resultado);
  
				}
				else{
				
					this.ws_gui_idm.OnResponde(this.ws_gui_idm.resultado);
				}
			
			}catch(err){
				
			 	ws_error = new	ws_ReportsGea();
				
				para = {};
				para.error=err.message;
				ws_error.setArgumentos(para);
				ws_error.setAccion(WS_FUNCIONES_DEF.GUI_IDM_ERROR);
				ws_error.OnError = function(error){ alert(err.message);};
				ws_error.OnResponde=function(data){};
				
				ws_error.consultarHttp();
				this.ws_gui_idm.ws_gui_idm_handle_json_error(err);
			}
			
						
			} else {
				
					error = {};
					error.ERROR = "Ocurrio un problema con la URL.";
					this.ws_gui_idm.ws_gui_idm_handle_json_error(error);
					
			}
					
		}
};
 ws_ReportsGea.prototype.ws_gui_idm_handle_json_error = function(err){
	this.OnError(err);
};
ws_ReportsGea.prototype.OnError = function(error){
	throw "Tienes que Implementar OnError";
};

 ws_ReportsGea.prototype.OnResponde = function (strRespuesta){
	throw "Tienes que Implementar OnResponde";
};

 ws_ReportsGea.prototype.setArgumentos = function(argumentos){
	this.argumentos.args = argumentos;
};


 ws_ReportsGea.prototype.setAccion = function(accion){
	this.argumentos.funcion = accion;
};

ws_ReportsGea.prototype.Abort = function(){
	this.http.abort();
};



