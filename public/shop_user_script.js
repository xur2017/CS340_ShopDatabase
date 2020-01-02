document.getElementById('addButton').addEventListener('click', function (event){
	console.log('addData start');
	var addForm = document.getElementById("addForm");              
	var param = "firstName="+addForm.elements.firstNameInput.value+    
				"&lastName="+addForm.elements.lastNameInput.value+
				"&phone="+addForm.elements.phoneInput.value+
				"&email="+addForm.elements.emailInput.value;
	
	var req = new XMLHttpRequest();
	req.open("GET", "/shop_user_insert?" + param, true);                 
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
			
			cell0.innerHTML = addForm.elements.firstNameInput.value;
			cell1.innerHTML = addForm.elements.lastNameInput.value;
			cell2.innerHTML = addForm.elements.phoneInput.value;
			cell3.innerHTML = addForm.elements.emailInput.value;
			
			var response = JSON.parse(req.responseText);
			var id = response.id;
			
			var updateData = document.createElement('td');
			var updateDataLink = document.createElement('a');
			updateDataLink.setAttribute('href','/shop_user_update1?id=' + id);
			var updateButton = document.createElement('input');
			updateButton.setAttribute('value','Update');
            updateButton.setAttribute('type','button');
			updateDataLink.appendChild(updateButton);
			updateData.appendChild(updateDataLink);
			row.appendChild(updateData);
		}
		else{
		    console.log('error');
		}
	});
	
	req.send(null);
	event.preventDefault();                                    
});

