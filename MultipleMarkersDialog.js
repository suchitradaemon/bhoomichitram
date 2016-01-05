var MultipleMarkersDialog=function(root){
	this.root=root;
	var that=this;
	
	var container=document.createElement("div");container.id="multipleMarkerContainer";container.className="multipleMarkersDialog";
	this.container=container;
	
	var visibleContainer=document.createElement("div");visibleContainer.id="visibleContainer";visibleContainer.className="visibleContainer";
	visibleContainer.ondblclick=function(){
		if('visibleContainer'==that.visibleContainer.className){that.visibleContainer.className='visibleContainerFullScreen';}
		else{that.visibleContainer.className='visibleContainer';}
	}
	this.visibleContainer=visibleContainer;
	
	var urlLabel=document.createElement("label");urlLabel.id="urlLabel";urlLabel.className="urlLabel";
	urlLabel.innerHTML="API url";this.urlLabel=urlLabel;

	var url=document.createElement("input");url.type="textbox";url.id="url";url.className="url";
	url.value="http://localhost/atomiton/airdata/devices.php";this.url=url;
	var send=document.createElement("button");send.innerHTML="send";send.className="send";
	send.onclick=this.callApi.bind(this);this.send=send;

	var urlContainer=document.createElement("div");urlContainer.id="urlContainer";urlContainer.className="urlContainer";
	urlContainer.appendChild(this.urlLabel);
	urlContainer.appendChild(this.url);
	urlContainer.appendChild(this.send);
	this.urlContainer=urlContainer;this.visibleContainer.appendChild(this.urlContainer);

	var apiResponse=document.createElement("div");apiResponse.id="apiResponse";apiResponse.className="apiResponse";this.apiResponse=apiResponse;
	this.visibleContainer.appendChild(this.apiResponse);
	this.container.appendChild(this.visibleContainer);
	this.root.appendChild(this.container);
}
MultipleMarkersDialog.prototype.callApi=function(){
	var url=this.url.value;
	var apiResponse=this.apiResponse;
	apiResponse.innerHTML="";
	var httpRequest=null;
	// Old compatibility code, no longer needed.
	if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
		httpRequest = new XMLHttpRequest();
	} else if (window.ActiveXObject) { // IE 6 and older
		httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(httpRequest){
		
		httpRequest.onreadystatechange = function(){
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
			  if (httpRequest.status === 200) {
				console.log(httpRequest.responseText);
				if(IsJsonString(httpRequest.responseText)){
					//apiResponse.innerHTML=httpRequest.responseText;
					var responseTree=new JSONTree(apiResponse,httpRequest.responseText);
					/*function determineType(root){
						console.log("Typeof root "+typeof(root));
						
						if( Object.prototype.toString.call( root ) === '[object Array]' ) {
							var map={};
							root.forEach(function(item){
								for(var key in item){
									if(!map[key]){
										map[key]=typeof(item[key]);
										console.log(" Array item "+key+": "+typeof(item[key]));
										determineType(item[key]);
									}
								}							
							});
							console.log("Map is ",map);
						}else if('object'==typeof(root))
						for(var item in root){
							console.log("item "+item+": "+typeof(root[item]));
							determineType(root[item]);
						}
					}
					determineType(JSON.parse(httpRequest.responseText));*/
				}
				else{console.log("The response is not a valid JSON!");apiResponse.innerHTML="The repsonse is not a valid JSON!";}
			  } else {
				console.log('There was a problem with the request.');
			  }
			}
		};
		httpRequest.open('GET', url);
		httpRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
		httpRequest.send();
	}else{console.log("Some problem with request object!");}
}