document.getElementById('addButton').addEventListener('click', function (event){
	console.log('addData start');
	var addForm = document.getElementById("addForm");              
	var param = "orderId="+addForm.elements.orderIdInput.value+    
				"&amount="+addForm.elements.amountInput.value;
	
	var req = new XMLHttpRequest();
	req.open("GET", "/invoice_insert?" + param, true);                 
	req.addEventListener("load",function(){
		if(req.status >= 200 && req.status < 400){
	    	console.log('success');
			var table = document.getElementById("showTable");
			x = table.rows.length;
			var row = table.insertRow(x);
			var cell0 = row.insertCell(0);
			var cell1 = row.insertCell(1);
			
			cell0.textContent = addForm.elements.orderIdInput.value;
			cell1.textContent = addForm.elements.amountInput.value;
			
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

