var MultipleMarkersDialog=function(root){
	this.root=root;
	var that=this;
	
	var container=document.createElement("div");container.id="multipleMarkerContainer";container.className="multipleMarkersDialog";
	this.container=container;
	
	var urlLabel=document.createElement("label");urlLabel.id="urlLabel";urlLabel.className="urlLabel";
	urlLabel.innerHTML="API url";this.urlLabel=urlLabel;

	var url=document.createElement("textbox");url.id="url";url.className="searchInput";
	this.url=url;
	var send=document.createElement("button");send.innerHTML="send";this.send=send;

	var urlContainer=document.createElement("div");urlContainer.id="urlContainer";urlContainer.className="urlContainer";
	urlContainer.appendChild(this.urlLabel);urlContainer.appendChild(this.url);urlContainer.appendChild(this.send);
	this.urlContainer=urlContainer;this.container.appendChild(this.urlContainer);

	var apiResponse=document.createElement("div");this.apiResponse=apiResponse;
	this.container.appendChild(this.apiResponse);

	this.root.appendChild(this.container);
}
