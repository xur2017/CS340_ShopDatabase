document.getElementById('addButton').addEventListener('click', function (event){
	console.log('addData start');
	var addForm = document.getElementById("addForm");              
	var param = "orderId="+addForm.elements.orderIdInput.value+    
				"&productId="+addForm.elements.productIdInput.value+
				"&quantity="+addForm.elements.quantityInput.value;
	
	var req = new XMLHttpRequest();
	req.open("GET", "/order_to_product_insert?" + param, true);                 
	req.addEventListener("load",function(){
		if(req.status >= 200 && req.status < 400){
	    	console.log('success');
			var table = document.getElementById("showTable");
			x = table.rows.length;
			var row = table.insertRow(x);
			var cell0 = row.insertCell(0);
			var cell1 = row.insertCell(1);
			var cell2 = row.insertCell(2);
			
			cell0.innerHTML = addForm.elements.orderIdInput.value;
			cell1.innerHTML = addForm.elements.productIdInput.value;
			cell2.innerHTML = addForm.elements.quantityInput.value;
			
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

