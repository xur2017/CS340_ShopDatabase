document.getElementById('addButton').addEventListener('click', function (event){
	console.log('addData start');
	var addForm = document.getElementById("addForm");              
	var param = "userId="+addForm.elements.userIdInput.value+    
				"&paymentMethodId="+addForm.elements.paymentMethodIdInput.value;
	
	var req = new XMLHttpRequest();
	req.open("GET", "/user_to_payment_insert?" + param, true);                 
	req.addEventListener("load",function(){
		if(req.status >= 200 && req.status < 400){
	    	console.log('success');
			var table = document.getElementById("showTable");
			x = table.rows.length;
			var row = table.insertRow(x);
			var cell0 = row.insertCell(0);
			var cell1 = row.insertCell(1);
			
			cell0.innerHTML = addForm.elements.userIdInput.value;
			cell1.innerHTML = addForm.elements.paymentMethodIdInput.value;
			
			var response = JSON.parse(req.responseText);
			var id = response.id;
			
			var deleteCell = document.createElement('td');
			var deleteButton = document.createElement('input');
			deleteButton.setAttribute('type','button');
			deleteButton.setAttribute('name','delete');
			deleteButton.setAttribute('value','Delete');
			deleteButton.setAttribute('onClick', 'deleteData(this,' + id +')');
			var deleteHidden = document.createElement('input');
			deleteHidden.setAttribute('type','hidden');
			deleteHidden.setAttribute('name', 'id');
			deleteHidden.setAttribute('value', id);
			deleteCell.appendChild(deleteButton);
			deleteCell.appendChild(deleteHidden);
			row.appendChild(deleteCell);
		}
		else{
		    console.log('error');
		}
	});
	
	req.send(null);
	event.preventDefault();                                    
});

function deleteData(btn,id){
	console.log('deleteData start');
	var req = new XMLHttpRequest();
	req.open("GET", "/user_to_payment_delete?id=" + id, true);
	req.addEventListener("load",function(){
		if(req.status >= 200 && req.status < 400){
	    	console.log('success');
			var row = btn.parentNode.parentNode;
			row.parentNode.removeChild(row);
		}
		else{
		    console.log('error');
		}
	});

	req.send(null);  
}