 var removeNode = function(vo, broadcast) {
	upDateParentModelViews(vo, broadcast);
	//#TODO => This won't work for transcluded nodes with the same parent...
	if( hasDuplicates(vo.thisModel.get("parents"))){ //later. 

	}
	else{
		var newParents = _.filter(vo.thisModel.get("parents"), function(parId){
			return parId != vo.parentId;
		});
		vo.thisModel.set("parents", newParents);
		if(!broadcast){ //broadCast=true means we received this update from somebody else. 
			socket.emit("removeNode", [vo.thisId, vo.thisIndex, vo.parentId, CurrentUser]);
		}
	}

}

var upDateParentModelViews = function(vo, broadcast){
	var children = vo.parentModel.get("children");
	children.remove(vo.thisIndex);
	vo.parentModel.set("children", children);
	


	if(!broadcast){ //broadCast=true means we received this update from somebody else.
		//UI STUFF
		console.log("what");
		if( !vo.thisLI.is(":first-child") ){
			var len = vo.thisLI.prev().children().children("textarea").val().length;
			vo.thisLI.prev().children().children("textarea").focus();
			vo.thisLI.prev().children().children("textarea").setSelection(len, len);
		}else{
			var len = vo.thisLI.parent().parent().children().children("textarea").val().length;
			vo.thisLI.parent().parent().children().children("textarea").focus();
			vo.thisLI.parent().parent().children().children("textarea").setSelection(len, len);
		}
	}


	_.each(vo.parentModel.get("views"), function(parentView){
		parentView.removeNode(vo.thisIndex);
	}); 

	INPUT_PROCESSED=true; 
}