<div>
<button class='btn btn-primary' type='button' style="margin: 15px 0px;" onclick='crearNuevoPlan()' > Nuevo Plan      <i class="glyphicon glyphicon-plus"></i></button>
</div>

<div>
	<div class="container">
	    <div class='col-md-2'>
	        <div class="form-group">
	            <div class='input-group date' id='datetimepicker6'>
	                <input type='text' class="form-control" />
	                <span class="input-group-addon">
	                    <span class="glyphicon glyphicon-calendar"></span>
	                </span>
	            </div>
	        </div>
	    </div>
	    <div class='col-md-2'>
	        <div class="form-group">
	            <div class='input-group date' id='datetimepicker7'>
	                <input type='text' class="form-control" />
	                <span class="input-group-addon">
	                    <span class="glyphicon glyphicon-calendar"></span>
	                </span>
	            </div>
	        </div>
	    </div>
	</div>
</div>
	<script type="text/javascript">
	    jQuery(function () {
	       	jQuery('#datetimepicker6').datetimepicker();
	        jQuery('#datetimepicker7').datetimepicker({
	            useCurrent: false //Important! See issue #1075
	        });
	        jQuery("#datetimepicker6").on("dp.change", function (e) {
	            jQuery('#datetimepicker7').data("DateTimePicker").minDate(e.date);
	        });
	        jQuery("#datetimepicker7").on("dp.change", function (e) {
	            jQuery('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
	        });
	    });
	</script>

	<table id='tblContextosUtilizados' 
	 	data-toolbar="#toolbar_planes"
		data-show-export='true'
		data-pagination='true' 	
		data-show-columns="true"      	
		data-export-types='["xml","txt", "excel"]'
	    data-toggle='table'      	
		data-search='true'	
		data-striped='true'
		data-search-align='right'
		data-sortable='true'>
		<thead>
			<tr> 
			    <th data-field='Contexto'		data-sortable='true' >Contexto</th>
			    <th data-field='Frecuencia'	data-sortable='true' >Frecuencia</th>	    	    
		    </tr>
		</thead>		
	</table>
	
</div>
 