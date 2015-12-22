var Panel=function(root,setLocation){
	var that=this;
	this.root=root;
	var panel=document.createElement("div");panel.className="panel";
	this.panel=panel;
	
	var search=this.createIcon("search","images/search16.png",null,"small");search.id="search";
	search.addEventListener("mouseover",that.showSearch.bind(that));
	search.addEventListener("mouseout",that.fadeOutSearch.bind(that));
	this.search=search;this.panel.appendChild(this.search);
	
	var searchPopup=new SearchPanel(document.body);
	searchPopup.searchPanel.addEventListener("mouseover",that.showSearch.bind(that));this.searchPopup=searchPopup;
	
	
	var myLocation=this.createIcon("myLocation","images/mylocation16.png",setLocation);
	this.myLocation=myLocation;this.panel.appendChild(this.myLocation);
	
	var direction=this.createIcon("myLocation","images/direction16.png");
	this.direction=direction;this.panel.appendChild(this.direction);
	
	var markers=this.createIcon("markers","images/markers16.png");
	this.markers=markers;this.panel.appendChild(this.markers);
	this.root.appendChild(this.panel);
	
	//document.body.appendChild(input);
}
Panel.prototype.createIcon=function(id,src,event,type){
	var holder=document.createElement("div");holder.className="holder";
	var icon=document.createElement("img");icon.src=src;icon.className="icons";
	if(type&&"small"==type){icon.className+=" icons-small";}else{icon.className+=" icons-normal";}
	//icon.style.width="25px";icon.style.height="25px";
	icon.id=id;if(event){icon.addEventListener("click",event);}
	holder.appendChild(icon);
	return holder;
}
Panel.prototype.showSearch=function(){
	console.log("In showSearch");
	this.searchPopup.show.apply(this.searchPopup,[document.getElementById("search")]);
}
Panel.prototype.fadeOutSearch=function(){
	//var input=document.getElementById("test");//input.style.visibility="hidden";
	this.searchPopup.fadeOut.apply(this.searchPopup);
}
Panel.prototype.hideSearch=function(){
	
}