var gameUtils = {
	centerObjects:function(objects){
		objects.forEach(function(object){
			object.anchor.setTo(0.5);
		})
	}
};