document.getElementById('addButton').addEventListener('click', function (event){
	console.log('addData start');
	var addForm = document.getElementById("addForm");              
	var param = "firstName="+addForm.elements.firstNameInput.value+    
				"&lastName="+addForm.elements.lastNameInput.value;
	
	var req = new XMLHttpRequest();
	req.open("GET", "/search_order_by_name?" + param, true);                 
	req.addEventListener("load",function(){
		if(req.status >= 200 && req.status < 400){
	    	console.log('success');
			
			var response = JSON.parse(req.responseText);
			var id = response.id;
		}
		else{
		    console.log('error');
		}
	});
	
	req.send(null);
	event.preventDefault();                                    
});

