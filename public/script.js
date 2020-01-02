document.getElementById('addButton').addEventListener('click', function (event){
	console.log('addData start');
	var addForm = document.getElementById("addForm");              
	var param = "name="+addForm.elements.nameInput.value+    
				"&reps="+addForm.elements.repsInput.value+
				"&weight="+addForm.elements.weightInput.value+
				"&date="+addForm.elements.dateInput.value;
	
	if(addForm.elements.unitInput.checked){
		param += "&unit=1";                                     
	}
	else{
		param += "&unit=0";
	}
	
	var req = new XMLHttpRequest();
	req.open("GET", "/insert?" + param, true);                 
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
			cell0.innerHTML = addForm.elements.nameInput.value;
			cell1.innerHTML = addForm.elements.repsInput.value;
			cell2.innerHTML = addForm.elements.weightInput.value;
			cell3.innerHTML = addForm.elements.dateInput.value;
			if(addForm.elements.unitInput.checked){
				cell4.innerHTML = "lbs";                                     
			}
			else{
				cell4.innerHTML = "kg"; 
			}
			var response = JSON.parse(req.responseText);
			var id = response.id;
			
			var updateData = document.createElement('td');
			var updateDataLink = document.createElement('a');
			updateDataLink.setAttribute('href','/updateTable?id=' + id);
			var updateButton = document.createElement('input');
			updateButton.setAttribute('value','Update');
            updateButton.setAttribute('type','button');
			updateDataLink.appendChild(updateButton);
			updateData.appendChild(updateDataLink);
			row.appendChild(updateData);
            
			var deleteCell = document.createElement('td');
			var deleteButton = document.createElement('input');
			deleteButton.setAttribute('type','button');
			deleteButton.setAttribute('name','delete');
			deleteButton.setAttribute('value','Delete');
			deleteButton.setAttribute('onClick', 'deleteData("dataTable",' + id +')');
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
	req.open("GET", "/delete?id=" + id, true);
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
