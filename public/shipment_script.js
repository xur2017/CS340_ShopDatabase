document.getElementById('addButton').addEventListener('click', function (event){
	console.log('addData start');
	var addForm = document.getElementById("addForm");              
	var param = "orderId="+addForm.elements.orderIdInput.value+    
				"&trackingNumber="+addForm.elements.trackingNumberInput.value+
				"&addressLine1="+addForm.elements.addressLine1Input.value+
				"&city="+addForm.elements.cityInput.value+
				"&state="+addForm.elements.stateInput.value+
				"&zip="+addForm.elements.zipInput.value;
	
	var req = new XMLHttpRequest();
	req.open("GET", "/shipment_insert?" + param, true);                 
	req.addEventListener("load",function(){
		if(req.status >= 200 && req.status < 400){
	    	console.log('success');
			var table = document.getElementById("showTable");
			x = table.rows.length;
			var row = table.insertRow(x);
			var cell0 = row.insertCell(0);
			var cell1 = row.insertCell(1);
			var cell2 = row.insertCell(2);
			var cell3 = row.insertCell(3);
			var cell4 = row.insertCell(4);
			var cell5 = row.insertCell(5);
			
			cell0.innerHTML = addForm.elements.orderIdInput.value;
			cell1.innerHTML = addForm.elements.trackingNumberInput.value;
			cell2.innerHTML = addForm.elements.addressLine1Input.value;
			cell3.innerHTML = addForm.elements.cityInput.value;
			cell4.innerHTML = addForm.elements.stateInput.value;
			cell5.innerHTML = addForm.elements.zipInput.value;
			
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

