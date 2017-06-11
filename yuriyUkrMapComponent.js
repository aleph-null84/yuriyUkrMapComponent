/*!
*
* Yuriy's Ukraine Map Component.
*
* @created Jun 11, 2017
* @author Yuriy Dmytryshyn
*
* Copyright 2017 Yuriy Dmytryshyn.  All rights reserved.
* 
*/

var yuriyUkrMapComp = BaseComponent.extend({
	update : function() {
		if(this.vectorMap){
			this.clear();
	    	$("#"+this.htmlObject).empty();
	    	$(".jqvmap-label").remove();
		}

		var myself=this;

		var mapData = {};

		if (this.parameters == undefined) {
			this.parameters = [];
		};
		
		// check if the components datasource is set
		if(!myself.queryDefinition){
			console.log("query not defined");
		} else {
			// create a query object
		  try {
			var query = new Query(myself.queryDefinition);
			
			// fire the query objects fetchdata method
			// no params and no callback
			query.fetchData(myself.parameters, function(values) {

				mapData = Dashboards.propertiesArrayToObject(values.resultset);
				
				var mapDefinition = {
					values: mapData
				};
				
				//console.log(mapDefinition);
				//console.log(mapData);
				
				if(myself.mapFile != undefined){
					mapDefinition.map = myself.mapFile;
				}
				if(myself.mapBackgroundColor != undefined){
					mapDefinition.backgroundColor = myself.mapBackgroundColor;
				}
				if(myself.mapBorderColor != undefined){
					mapDefinition.borderColor = myself.mapBorderColor;
				}
				if(myself.mapBorderOpacity != undefined){
					mapDefinition.borderOpacity = myself.mapBorderOpacity;
				}
				if(myself.mapBorderWidth != undefined){
					mapDefinition.borderWidth = myself.mapBorderWidth;
				}
				if(myself.mapColor != undefined){
					mapDefinition.color = myself.mapColor;
				}
				if(myself.mapColors != undefined){
					mapDefinition.colors = myself.mapColors;
				}
				if(myself.mapEnableZoom != undefined){
					mapDefinition.enableZoom = myself.mapEnableZoom;
				}
				if(myself.mapHoverColor != undefined){
					mapDefinition.hoverColor = myself.mapHoverColor;
				}
				if(myself.mapHoverColors != undefined){
					mapDefinition.hoverColors = myself.mapHoverColors;
				}
				if(myself.mapHoverOpacity != undefined){
					mapDefinition.hoverOpacity = myself.mapHoverOpacity;
				}
				if(myself.mapNormalizeFunction != undefined){
					mapDefinition.normalizeFunction = myself.mapNormalizeFunction;
				}
				if(myself.mapScaleColors != undefined){
					mapDefinition.scaleColors = myself.mapScaleColors;
				}
				if(myself.mapSelectedColor != undefined){
					mapDefinition.selectedColor = myself.mapSelectedColor;
				}
				if(myself.mapSelectedRegions != undefined){
					mapDefinition.selectedRegions = myself.mapSelectedRegions;
				}
				if(myself.mapMultiSelectRegion != undefined){
					mapDefinition.multiSelectRegion = myself.mapMultiSelectRegion;
				}
				if(myself.mapShowLabels != undefined){
					mapDefinition.showLabels = myself.mapShowLabels;
				}
				if(myself.mapShowTooltip != undefined){
					mapDefinition.showTooltip = myself.mapShowTooltip;
				}
				if(myself.mapPins != undefined){
					mapDefinition.pins = myself.mapPins;
				}
				if(myself.mapPinMode != undefined){
					mapDefinition.pinMode = myself.mapPinMode;
				}
				if(myself.mapOnLoad != undefined){
					mapDefinition.onLoad = myself.mapOnLoad;
				}
				if(myself.mapOnLabelShow != undefined){
					mapDefinition.onLabelShow = function(event, label, code) {
						var labelString = myself.mapOnLabelShow(event, label.text(), code, mapData);
						label.html(labelString);
					}
				}
				if(myself.mapOnRegionOver != undefined){
					mapDefinition.onRegionOver = myself.mapOnRegionOver;
				}
				if(myself.mapOnRegionOut != undefined){
					mapDefinition.onRegionOut = myself.mapOnRegionOut;
				}
				if(myself.mapOnRegionClick != undefined){
					mapDefinition.onRegionClick = myself.mapOnRegionClick;
				} else {
				    mapDefinition.onRegionClick = function(event, code, region){event.preventDefault();}
				}
				if(myself.mapOnRegionSelect != undefined){
					mapDefinition.onRegionSelect = myself.mapOnRegionSelect;
				}
				if(myself.mapOnRegionDeselect != undefined){
					mapDefinition.onRegionDeselect = myself.mapOnRegionDeselect;
				}
				if(myself.mapOnResize != undefined){
					mapDefinition.onResize = myself.mapOnResize;
				}
				
				myself.vectorMap=$("#"+myself.htmlObject).vectorMap(mapDefinition);
				if(myself.mapOnRegionClick != undefined){
					$("#"+myself.htmlObject+" path.jqvmap-region").css("cursor","pointer");
				}
			});
		  } catch(err) {
		    console.log("query execution error: " + err.message);
		  }			
		}
	}
	
});