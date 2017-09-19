clickToUpload = function (divElement, btnName, btnClass)
{
	this.initialize(divElement,btnName, btnClass);
};

clickToUpload.prototype.DIV_ELMNT;
clickToUpload.prototype.BTN_NAME;

clickToUpload.prototype.FILES  	= [];
clickToUpload.prototype.URL 	= window.location.origin+"/Mad_AppMiMovistar";
 


clickToUpload.prototype.initialize = function(divElement, btnName, btnClass)
{
	if(divElement)
	{
		divElement.CTU = this;				//objeto dentro del div
		this.DIV_ELMNT 	= divElement;		//div contenedor
		this.BTN_NAME 	= btnName? btnName: "Add Some Files";	//nombre del boton
		this.BTN_CLASS = btnClass? btnClass : "btn btn-default btn-sm";
		this.FILES = [];					//archivos subidos

		this.btn_Main 	= null;				//boton
		this.btn_Picker = null;				//boton file
		this.btn_Upload = null;				//soton subir
		
		this.div_Labels = null;				//contenedor de las etiquetas
		
		this.loadControl();					//Funcion de carga del objeto
	}
	else
		console.error("No place to set the control!");
};




clickToUpload.prototype.loadControl = function()
{
	var btnClickToUpload = document.createElement("button");
	btnClickToUpload.CTU = this;
	btnClickToUpload.innerHTML 	= this.BTN_NAME; //<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
	btnClickToUpload.className = this.BTN_CLASS; //btn btn-primary btn-sm
	btnClickToUpload.onclick 	= this.OpenControl;
	btnClickToUpload.title 	="Agregar nuevo Pin";
	
	
	
	this.btn_Main = btnClickToUpload;
	this.DIV_ELMNT.appendChild(btnClickToUpload);
};

clickToUpload.prototype.OpenControl = function ()
{
	var obj_CTU = this.CTU;				//insstancia del objeto
	bootbox.dialog({
                title: "Cargar nueva imagen de marca",
                message:  
                     
				   	'<div  class="containerFiles">'+
					    '<ul id = "div_Labels">'+
					  	'</ul>'+
				    '</div>'+
				    '<div class="attachBtnDiv">'+
						'<input id="btn_Picker" type="file"  name="fileselect[]"  /> '+     //multiple  (ya noes multiple) 		
				    '</div>',
                buttons: {
                	danger: {label: "Cancelar" },
				    main: {
				      	label: "Subir",
				      	  callback: function() {
				      	  	guardarInfoTemporal();
				      	  	obj_CTU.subirArchivos();
				      } 
 				    }
				    
                }
            }
       );	//dialogo
        
        
        obj_CTU.div_Labels =	document.getElementById('div_Labels');	//elemento contenedor de etiquetas
        obj_CTU.btn_Picker =	document.getElementById('btn_Picker');	//boton file
        obj_CTU.btn_Picker.CTU = obj_CTU;								//agrego instancia del objeto al boton

        
		btn_Picker.addEventListener('change', 	obj_CTU.handleFileSelect, false);	//add evento para cuando cambien los archivos cargados
        
        obj_CTU.removeDetalle();
        obj_CTU.crearDetalle();														//carga los labels de los elementos subidos
};




clickToUpload.prototype.handleFileSelect = function(e) //function handleFileSelect()
{
	var obj_CTU = this.CTU;	//instancia del objeto
	
 	var files = this.files;
	var contianerDetalleFiles = obj_CTU.div_Labels;
	
	
	
	/*VERIFICA SI ALGUNO DE LOS ARCHIVOS NO PUEDE SER CARGADO*/
	var sobrePeso = false;		
	var sobrePesoName = "";
	for(var i=0; i<files.length; i++)
	{
		if(files[i].size > 2097152)
		{
			sobrePesoName = files[i].name;
			sobrePeso = true;
			break;
		}
	}
	/*FIN*/

	obj_CTU.removeDetalle();	//remueve todas las etiquetas de la lista

	if(files.length < 1) 			//SI NO CARGA ARCHIVOS 
	{
		console.log("NO FILE PICKED");	//no pasa nada
	}
	else if(sobrePeso)				//SI UNO DE LOS ARCHIVOS NO PUEDE SER CARGADO
	{
		var mensaje = "El archivo '"+sobrePesoName+"' supera el tamaño máximo de: '2 MB'. Por favor vuelve a seleccionar los archivos";
		alert(mensaje);						//Muestra mensaje
		obj_CTU.btn_Picker.value = '';		//remueve los archivos seleccionados en el control 
	}
	else 							//SI PUEDE CARGAR LOS ARCHIVOS
	{
	
		for(var i=0; i<files.length; i++)		//crea los labels correspondientes
		{
			var lbl_nombre 			= document.createElement("label");
		 	lbl_nombre.className	= "labelFileName";
			lbl_nombre.innerHTML 	= files[i].name;
	
			var lbl_detalle 		=  document.createElement("label");
			lbl_detalle.className	= "labelProgress";
			lbl_detalle.innerHTML 	= "Listo para subir";
			
			var objFile = 
			{
				"id"	: null,
				"nombre": files[i].name,
				"subido": false,
				"subiendo" : false,
				"porcentaje" : 0,
				"lbl_Nombre": lbl_nombre,
				"lbl_Detalle": lbl_detalle,
			};
			files[i].obj = objFile;
			obj_CTU.FILES.push(objFile);	//agrego a mis archivos 
		}	
	}
	obj_CTU.crearDetalle();					//dibuja las etiquetas
};

clickToUpload.prototype.removeDetalle = function(objArchivo) //REMUEVE LAS ETIQUETAS
{
	var arraytoDelete = [];
	for(var i = this.FILES.length-1; i >= 0 ; i--)
	{
		if(! (this.FILES[i].subido || this.FILES[i].subiendo) )
		{
			arraytoDelete.push(i);
		}
	}
	for(var i=0 ; i < arraytoDelete.length ; i++)
		this.FILES.splice(arraytoDelete[i], 1);

	while (this.div_Labels.hasChildNodes()) {
		    this.div_Labels.removeChild(this.div_Labels.lastChild);
		}
};

clickToUpload.prototype.crearDetalle = function(objArchivo) //function subirArchivos() 
{
	while (this.div_Labels.hasChildNodes()) {
		    this.div_Labels.removeChild(this.div_Labels.lastChild);
		}
		
		
	if(this.FILES.length < 1)
	{
		var li = document.createElement("li");
		li.innerHTML = "Por favor selecciona un archivo tipo imagen. el tamaño de recomendado es de 48x48 px.";
		this.div_Labels.appendChild(li);
	}
	else
	{
		for(var i = 0; i< this.FILES.length; i++)
		{
			this.crearLabelArchivo(this.FILES[i]);
		}
	}
	
};


clickToUpload.prototype.crearLabelArchivo = function(objArchivo) //function subirArchivos() 
{
	var li = document.createElement("li");
	var lbl_nombre =  objArchivo.lbl_Nombre;
	var lbl_detalle = objArchivo.lbl_Detalle; 
	
	li.appendChild(lbl_nombre);
	li.appendChild(lbl_detalle);
	this.div_Labels.appendChild(li);
};










clickToUpload.prototype.subirArchivos = function() //function subirArchivos() 
{
	//this.disabled = true;
	//document.getElementById('uploadFiles').disabled= true;
   	//document.getElementById('fileselect').disabled= true;
       	
    var CTU = this;  
	var url = CTU.URL;
	
	
	var jsonArgumentos = {
	"funcion" : "GUI_IDM_UPLOAD_FILE",
	"args" : {}
	};

	var fileselect = this.btn_Picker;
	
	for(var i=0; i<fileselect.files.length ; i++)
	{
		var file = fileselect.files[i];
 		var http = new XMLHttpRequest();

		var formData = new FormData();
		formData.append("afile", file);
		formData.append("PARAM", JSON.stringify(jsonArgumentos));
		http.open("POST", url, true);
		
		
		http.upload.fileObj = file.obj;
		http.CTU = this;
		http.upload.onprogress = this.progressUpload;
 
		http.fileObj = file.obj;;
		http.onreadystatechange = this.onReadyUpload;

		//http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		//http.setRequestHeader("Content-Type","multipart/form-data");
		//http.setRequestHeader("Accept-Charset", "ISO-8859-1");
		http.send(formData);
		openDialogSpinner();
		
	}
	CTU.btn_Picker.value = '';
};







clickToUpload.prototype.onReadyUpload = function() //function onReadyUpload()
{
	if (this.readyState == 4) {
		if (this.status == 200) {
			var json_data = this.responseText;
			var the_object = eval("(" + json_data + ")");
			var bojFile = this.fileObj;
			
			console.log(the_object);
			if(the_object.resultado)
			{
  				//consultar nuevamente los archivos PINS
				ws_getAndRefreshPins(the_object.file);
			}
			else
			{
				openDialogBox("No fue posible subir el archivo. Error: "+ the_object.error);
 			}
		}
		else {
			alert("Ocurrio un problema con la URL.");
		}
		//http_request = null;
	}
};
		
clickToUpload.prototype.progressUpload = function(e) //function subirArchivos(e)
{
	if (e.lengthComputable) {
		var percentComplete = parseInt((e.loaded / e.total) * 100);
		console.log(percentComplete + '% uploaded');
	}
};
