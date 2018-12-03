function noviClan(i)
{
	let tmp = `<div class="clanTima col-md-3 podaciTim`+i+`">
                    <h3>`+i+`. član</h3>
                    <div class="form-group">
                        <label for="ime">Grad</label>
                        <input class="form-control" type="text" name="city" id="city`+i+`" required/>
                    </div>
                    <div class="form-group">
                        <label for="prezime">Email</label>
                        <input class="form-control" type="email" name="email" id="email`+i+`" required/>
                    </div>
                    <div class="form-group">
                        <label for="ime">Ime</label>
                        <input class="form-control" type="text" name="first_name" id="first_name`+i+`" required/>
                    </div>
                    <div class="form-group">
                        <label for="prezime">Prezime</label>
                        <input class="form-control" type="text" name="last_name" id="last_name`+i+`" required/>
                    </div>
                    <div class="form-group">
                        <label for="ime">Broj telefona</label>
                        <input class="form-control" type="text" name="phone_number" id="phone_number`+i+`" required/>
                    </div>
                    <div class="form-group">
                        <label for="prezime">Škola</label>
                        <input class="form-control" type="text" name="school" id="school`+i+`" required/>
                    </div>
                </div>`;
	return tmp;
}

function backupInfo()
{
	let podaci = {};
	let unosi = document.querySelectorAll("input");
	unosi.forEach((u) => {podaci[u.id] = u.value});
	localStorage.setItem("prijava", JSON.stringify(podaci));
}

function restoreInfo()
{
	let podaci = localStorage.getItem("prijava");
	if (podaci === null) return;
	podaci = JSON.parse(podaci);

	let unosi = document.querySelectorAll("input");
	unosi.forEach((u) => { try{if(podaci.hasOwnProperty(u.id)) window[u.id].value = podaci[u.id];}catch(e){}});
}

function dodajPoslednjeg()
{
	
	backupInfo();
	document.querySelector(".obrisiMe").remove();
	document.querySelector(".team_members").innerHTML+=noviClan(4);
	restoreInfo();
	
}

for(let i=1; i<=3; i++)
	document.querySelector(".team_members").innerHTML+=noviClan(i);	

document.querySelector(".team_members").innerHTML += `<div class='obrisiMe col-md-3 vcenter'>
			<button class="btn btn-secondary" onclick="dodajPoslednjeg()">
				<i class="fas fa-plus-circle"></i> Dodaj poslednjeg clana
			</button>
		 </div>`;

function posaljiPrijavu()
{
	let obj = {};
	obj.description = description.value;
	obj.name = team_name.value;
	obj.photo_url = photo_url.value;
	obj.team_members = [];

	for (let i=1; i<=4; i++)
	{
		let listaUlaza = document.querySelectorAll(".podaciTim"+i+" input");
		if (listaUlaza.length == 0)
			continue;

		let member = {};
		listaUlaza.forEach( (ulaz) => { member[ulaz.name] = ulaz.value;});
		obj.team_members.push(member);
		
	}
	let generated = JSON.stringify(obj);
	//output.innerHTML = generated;

/// SLANJE NA SERVER!	
	var req = new XMLHttpRequest();
    	req.open('POST', requestURL, true)
    	req.setRequestHeader('Content-Type', 'application/json')

	req.onload = function (e) {
		if (req.readyState === 4) 
		{
		    if (req.status !== 201) 
		    {
			output.innerHTML = '<div class="alert alert-danger" role="alert">Greška! ' + req.statusText + '</div>';
			return;
		    }

         	    //output.innerHTML = req.responseText;
			
		    let odg = JSON.parse(req.response);
		    //console.log(odg);
		    output.innerHTML = '<div class="alert alert-success" role="alert">Uspešno ste registrovani! <br />Vaša šifra za logovanje je: <b>' + odg["team_uuid"] + '</b><br />Obavezno je zapišite!</div>'; 
		    listaTimova.style.visibility = "visible";
		       
		}
	    };

    req.send(generated);
}

forma.addEventListener("submit", function (e) {
	e.preventDefault();
	posaljiPrijavu();
    return false;
});


document.addEventListener('DOMContentLoaded', () => {
restoreInfo();
for (let i=0; i<document.getElementsByTagName("input").length; i++)
	document.getElementsByTagName("input")[i].addEventListener("input", () => {backupInfo();});
}, false);


