# MLBF
A solution for Mobile Web App. Integrated MV*, Seajs, Zepto.

##	List

*	[Install](#Install)
*	[Seajs](#Seajs)
*	[MV*](#MV*)
*   [Mobilebone](#Mobilebone)

## Install

	git clone https://github.com/FroadUED/MLBF.git

or use bower to install:

	// version 3.0.0
    bower install MLBF

## Seajs

	//defined a module
	MLBF.define("appName", function(require, exports, module) {})
	//require a module
	MLBF.require("appName");

Seajs has a bug in mobile:

When use parseDependencies function, it weasts a lot of CPU.

## MV*

Use Restful rules, will have logger, speed modules.

	{
		"create": "POST",
	    "update": "PUT",
	    "patch": "PATCH",
	    "del": "DELETE",
	    "read": "GET"
	}
	
	REST.create({
        url: this.url,
        data: {
        	// Json
        },
        success: function() {
        	// toDo
        }
    })
	

## Mobilebone
	
Find all introductions in [mobilebone's github project](https://github.com/zhangxinxu/mobilebone). From 3.0.0, I have removed Mobilebone.

© ued@f-road.com.cn
