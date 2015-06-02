# MLBF
A solution for Mobile Web App. Integrated MV*, simple CMD, Zepto and Mobilebone.

##	List

*	[Install](#Install)
*	[Simple CMD](#Simple CMD)
*	[MV*](#MV*)
*   [Mobilebone](#Mobilebone)

### Install

For Mac:
	git clone https://github.com/aui/artTemplate.git
or
    bower install MLBF // 0.0.1

For Windows: 

[github项目](https://github.com/FroadUED/MLBF)

### CMD

	//defined a module
	MLBF.define("appName", function(require, exports, module) {})
	//require a module
	MLBF.require("appName");

### MV*

Use Restful rules, will have logger, speed modules 

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
	

### Mobilebone
	
[github项目](https://github.com/zhangxinxu/mobilebone)

© ued@f-road.com.cn