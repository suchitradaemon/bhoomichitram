var TreeElement=function(root, label, type, children){
	this.root=root;
	if('Array'==type){
		
	}else if('Object'==type){
		var container=document.createElement("div");
		this.container=container;
	
		this.root.appendChild(this.container);
	}
	
}