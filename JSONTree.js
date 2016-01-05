var JSONTree=function(root,json){
	this.ARRAY='array';this.OBJECT='object';this.LEAF='leaf';
	this.root=root;
	var container=document.createElement("div");this.container=container;
	this.root.appendChild(container);
	var obj=null;
	if(IsJsonString(json)){obj=JSON.parse(json);}
	else if('object'==typeof(json)){obj=json;}
	if(obj){console.log("Creating tree");this.addElements(this,obj,this.container,"",5);}
}
JSONTree.prototype.addElements=function(context,ObjectRoot, parent, name, level){
	console.log("ObjectRoot ", ObjectRoot,"Parent",parent);
	console.log("Typeof ObjectRoot "+typeof(ObjectRoot));
	var element=null;
	if( isArray(ObjectRoot) ) {
		var map={};
		var childType="";
		if(ObjectRoot[0]){
			console.log("Condition",('object'==typeof(ObjectRoot[0])||isArray(ObjectRoot[0])));
			if(!('object'==typeof(ObjectRoot[0])||isArray(ObjectRoot[0]))){childType=typeof(ObjectRoot[0]);}
		}
		element=context.createElement(context,this.ARRAY,name,level,null,childType);
		parent.appendChild(element);
		console.log("ObjectRoot[0]",ObjectRoot[0],childType);
		if(ObjectRoot[0]&&""==childType){
			console.log("Looping through each element");
			ObjectRoot.forEach(function(item){
				for(var key in item){
					if(!map[key]){
						map[key]=typeof(item[key]);
						console.log(" Array item "+key+": "+typeof(item[key]),this,item[key],element,key,level+1);
						context.addElements(context,item[key],element.getElementsByTagName("div")[0],key,level+1);
					}
				}	
			});
		}
		console.log("Map is ",map);
	}else if('object'==typeof(ObjectRoot)){
		element=context.createElement(context,this.OBJECT,name,level);
		parent.appendChild(element);
		for(var item in ObjectRoot){
			console.log("item "+item+": "+typeof(ObjectRoot[item]));
			context.addElements(this,ObjectRoot[item],element.getElementsByTagName("div")[0],item,level+1);
		}
	}else{
		element=context.createElement(context,this.LEAF,name,level,ObjectRoot,typeof(ObjectRoot));
		parent.appendChild(element);
	}
}
JSONTree.prototype.createElement=function(context,type,name,level,value,datatype){
	var element=null;
	switch(type){
		case this.ARRAY:
		element=document.createElement("div");element.style.paddingLeft=level*2+"px";
		var container=document.createElement("div");container.className="treeElementHolder";
		var labelHolder=document.createElement("div");labelHolder.className="labelHolder";
		var icon=document.createElement("img");icon.src="images/collapse.png";icon.className="iconExpand";
		icon.onclick=this.clickCallback.bind(this);labelHolder.appendChild(icon);
		var label=document.createElement("label");label.innerHTML=name+" ["+(""==datatype?" ":datatype)+"]";label.className="elementLabel";
		labelHolder.appendChild(label);container.appendChild(labelHolder);
		element.appendChild(container);
		break;
		case this.OBJECT:
		element=document.createElement("div");element.style.paddingLeft=level*2+"px";
		var container=document.createElement("div");container.className="treeElementHolder";
		var labelHolder=document.createElement("div");labelHolder.className="labelHolder";
		var icon=document.createElement("img");icon.src="images/collapse.png";icon.className="iconExpand";
		icon.onclick=this.clickCallback.bind(this);labelHolder.appendChild(icon);
		var label=document.createElement("label");label.innerHTML=name+" { }";label.className="elementLabel";
		labelHolder.appendChild(label);container.appendChild(labelHolder);
		element.appendChild(container);
		break;
		case this.LEAF:
		element=document.createElement("div");element.style.paddingLeft=(level*2+2)+"px";
		var labelHolder=document.createElement("div");labelHolder.className="labelHolder";
		var label=document.createElement("label");label.innerHTML=name +" ("+datatype+") ";label.className="elementLabel";
		labelHolder.appendChild(label);element.appendChild(labelHolder);element.title="example value: "+value;
		break;
	}
	return element;
}
JSONTree.prototype.clickCallback=function(event){
	console.log("Click ",event,'img'==event.target.tagName.toLowerCase());
	if('img'==event.target.tagName.toLowerCase()){
		console.log("className is "+event.target.className,'iconCollapse'==event.target.className);
		if('iconCollapse'==event.target.className){this.expand(event.target);}
		else{this.collapse(event.target);}
	}
}
JSONTree.prototype.collapse=function(image){
	var siblingDivs=Array.from(image.parentNode.parentNode.childNodes).filter(function(node){return image.parentNode!=node&&'div'.toLowerCase()==node.tagName.toLowerCase();}).
		forEach(function(div){div.className='hide';});
		image.className='iconCollapse';
	console.log("Changed classname to iconCollapse");
}
JSONTree.prototype.expand=function(image){
	var siblingDivs=Array.from(image.parentNode.parentNode.childNodes).filter(function(node){return image.parentNode!=node&&'div'.toLowerCase()==node.tagName.toLowerCase();}).
		forEach(function(div){div.className='';});
	image.className='iconExpand';
	console.log("Changed classname to iconExpand");
}