var flag = false;

function validateInput(inputField) {
	if(inputField.value ==="") {
		document.getElementById('helptext').innerHTML = "";
		flag=false;
	}
	else {
		flag=true;
		}
	
if(flag)
{

		localStorage.setItem('uName',inputField.value);
		
		
		document.getElementById('anchor_id').href ="game.html" ;
}
	
}

