var SearchPanel=function(root){
	var that=this;
	this.root=root;
	
	
	var searchPanel=document.createElement("div");
	searchPanel.id="searchPanel";searchPanel.className="searchPanel";
	searchPanel.style.position="absolute";searchPanel.style.visibility="hidden";
	this.searchPanel=searchPanel;
	
	var searchPanelHolder=document.createElement("div");
	searchPanelHolder.id="searchPanelHolder";searchPanelHolder.className="searchPanelHolder";
	this.searchPanelHolder=searchPanelHolder;
	
	var searchInput=document.createElement("input");searchInput.id="searchInput";
	searchInput.className="searchInput";searchInput.type="textbox";
	searchInput.onkeydown=function(){getAddresses(that.searchInput.value,geocoder,that.showHints.bind(that),null);};
	this.searchInput=searchInput;
	
	this.searchPanelHolder.appendChild(this.searchInput);
	this.searchPanel.appendChild(this.searchPanelHolder);
	this.root.appendChild(this.searchPanel);
	
	var hints=document.createElement("div");hints.style.visibility="hidden";
	hints.id="hints";hints.style.position="absolute";hints.className="searchPanel";
	this.hints=hints;this.root.appendChild(this.hints);
};
SearchPanel.prototype.show=function(element){
	var input=this.searchPanel;
	input.style.opacity=1;
	var transition="opacity 0s";
	input.style.WebkitTransition=input.style.MozTransition=transition;
	input.style.left=(element.getBoundingClientRect().right+5)+"px";
	input.style.top=(element.getBoundingClientRect().top - 3)+"px";
	input.style.visibility="visible";
}
SearchPanel.prototype.fadeOut=function(){
	var input=this.searchPanel, hints=this.hints;
	input.style.opacity=0;hints.style.opacity=0;
	input.style.visibility="hidden";hints.style.visibility="hidden";
	var transition="visibility 0s 2s, opacity 2s linear";
	input.style.WebkitTransition=input.style.MozTransition=transition;
	hints.style.WebkitTransition=hints.style.MozTransition=transition;
}
SearchPanel.prototype.showHints=function(results){
	console.log(results);this.hints.innerHTML="";
	this.hints.style.visibility="visible";this.hints.style.opacity=1;
	var address,label;
	for(var i=0;i<results.length;++i){
		address=document.createElement("div");address.className="hintHolder";
		label=document.createElement("label");label.innerHTML=results[i].formatted_address;
		label.className="hint";address.data=results[i];address.onclick=function(event){showLocation(event.target.data)};
		address.appendChild(label);this.hints.appendChild(address);
	}
	this.hints.style.top=(this.searchPanelHolder.getBoundingClientRect().bottom+5)+"px";
	this.hints.style.left=(this.searchPanelHolder.getBoundingClientRect().left)+"px";
	this.hints.style.width=(this.searchPanelHolder.getBoundingClientRect().width)+"px";
}