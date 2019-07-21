String.prototype.clone = function () {
	return this;
}

Boolean.prototype.clone = function () {
	return this;
}

Number.prototype.clone = function () {
	return this;
}


function isNumeric(value){
	if (typeof(value) != typeof(1.0))		return false;
	if (isNaN(value))			 			return false;
	return true;
}

function isNumeric2(value){
	 return (!isNaN(1*value));
}

function isInteger(value){
	var val = 1*value;
	if (isNaN(val)) return false;
	if (Math.round(val) != val) return false;
	return true;
}

function isString(x){
	if (typeof(x)==typeof("Hello") ){
		return true;
	}
	return false;
}


function obj2str(obj, prefix, compact) {
	if (typeof(prefix) == 'undefined') prefix = "";
	if (prefix === null) prefix = "";
	var sep = "\n";
	var arrayPrefix = "";
	if ((typeof(compact) != 'undefined') && (compact === true) ) {
		sep = "";
		arrayPrefix = "";
	} else {
		compact = false;
	}
	switch (typeof(obj)) {
	case 'undefined':
		return prefix+' is undefined';
	case 'number':
	case 'string':
		if (prefix === "") return obj;
		return prefix+': '+obj
	case 'function':
		return prefix+' is a function';
	}
	if (obj === null) return  prefix+' is null';
	
	var str = "";
	var astr = "";
	var isarray = false;
	if (typeof(obj.length) != 'undefined') { 
		isarray = true;
		astr += prefix+arrayPrefix+"[ ";
		for (var i=0; i < obj.length; i++)	{ 
			if (i > 0)	astr += ", ";
			astr += obj2str(obj[i],"",compact);
		}
		astr += " ]";
	}
	for (var m in obj) {
		if ((isarray) && (isInteger(m)) && (m >= 0) && (m < obj.length) ) continue;
		var name = prefix + "." +m;
		if (typeof(obj[m])=='undefined') {
			str += name + " is undefined"+sep;
		} else if (obj[m] === null) {
			str += name + " is null"+sep;
		} else if ( typeof(obj[m]) == "function") {
			// DO NOTHING
		} else if ( typeof(obj[m]) == "object") {
			str += obj2str(obj[m], name, compact);
		} else {
			str += name + ": " + obj[m] + " "+sep;
		}
	}		
	if (isarray)	str = astr + sep + str;
	if ((str === ""))	return prefix+' is empty'
	return str;
}


//===============================================
//    Class is the root class
//===============================================

function Class () { return this;}
Class.prototype = new Object();
Class.prototype.constructor = Class
Class.ParentClass;
Class.name = "Class";
Class.hierarchy = "Class";
Class.prototype.parent;
Class.prototype.getClass = function () { return  this.constructor; }
Class.prototype.subclass = function (mysubclass) { 
	var myclass = this.constructor; 
	this.parent = myclass; 
	mysubclass.ParentClass = myclass; 
	mysubclass.name = mysubclass.toString().split(" ")[1].split("(")[0]; 
	mysubclass.hierarchy = myclass.hierarchy + "."+mysubclass.name;
	return this;}
Class.prototype.getPrototype= function () { return  this.getClass().prototype; } 
Class.prototype.getParentClass= function () { return  this.parent; }
Class.prototype.getClassName= function () {
	return this.getClass().name;
}
Class.prototype.getClassHierarchy= function () {
	return this.getClass().hierarchy;
}

Class.prototype.clone = function () {
	var obj = new this.getClass();
	for (var m in this) {
		var x = this[m];
		if (typeof(x) != "undefined") {
			if (typeof(this[m].clone) != "undefined") {
				obj[m] = this[m].clone();
			}
		}

	}
	return obj;
}

Class.prototype.toString = function () {
	return obj2str(this, null);
}





