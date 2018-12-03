prikaz.style.visibility = "hidden";

if (headerLogin())
{
	sifraTima.value = tim.team_uuid;
	handleLogin();
}

function handleLogin() 
{
    var request = new XMLHttpRequest();

    request.open('GET', requestURL + sifraTima.value);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        var tim = request.response;
	prikaz.style.visibility = "hidden";
	if (tim["error"])
	{
		output.innerHTML = "<div class='alert alert-danger' role='alert'>"+tim["error"]+"</div>";
		return;
	}
	localStorage.setItem("login", JSON.stringify(tim));
	headerLogin();

	output.innerHTML="";
	prikaz.style.visibility = "visible";

        imeTima.value = tim['name'];
        opisTima.value = tim['description'];

        var clanovi = tim['team_members'];
        ispisiClanove(clanovi);

    }

}

login.addEventListener("submit", (e) => { e.preventDefault(); e.stopImmediatePropagation(); handleLogin();}, false);

function logout()
{
	localStorage.removeItem("login");
	location.reload(true);
}

function ispisiClanove(clanovi)
{

    let content = `<div id="table" class="table-editable sivoprovidno">
		      <table class="table table-bordered table-responsive-md table-striped text-center">
			<tr>
			  <th class="text-center">Ime</th>
			  <th class="text-center">Prezime</th>
			  <th class="text-center">E-mail</th>
			  <th class="text-center">Broj telefona</th>
			  <th class="text-center">Škola</th>
			  <th class="text-center">Mesto</th>
			  <th class="text-center"></th>
			</tr>`;
    

    for (var j = 0; j < 4; j++)
    {
	let trenutni = {};
	if (clanovi.length>j)
		trenutni = clanovi[j];
	else
		trenutni = {first_name: "", last_name: "", email: "", phone_number: "", school: "", city: "", id: -j};

        content += `<tr id="clanInfo_`+trenutni.id+`">
			  <td class="pt-3-half" contenteditable="true" id="first_name_`+trenutni.id+`">`+trenutni.first_name+`</td>
			  <td class="pt-3-half" contenteditable="true" id="last_name_`+trenutni.id+`">`+trenutni.last_name+`</td>
			  <td class="pt-3-half" contenteditable="true" id="email_`+trenutni.id+`">`+trenutni.email+`</td>
			  <td class="pt-3-half" contenteditable="true" id="phone_number_`+trenutni.id+`">`+trenutni.phone_number+`</td>
			  <td class="pt-3-half" contenteditable="true" id="school_`+trenutni.id+`">`+trenutni.school+`</td>
			  <td class="pt-3-half" contenteditable="true" id="city_`+trenutni.id+`">`+trenutni.city+`</td>
			  <td>
				<span class="table-remove">
					<button type="button" class="btn btn-success btn-rounded btn-sm my-0" onclick="izmeniClana(`+j+`, `+trenutni.id+`)">Izmeni</button>
				</span>
			  </td>
			</tr>`;
    }
    content += `</table>
		    </div>`;
    tabelaIzmena.innerHTML = content;
}

function posaljiPromene()
{
    let data = JSON.stringify(tim);
    var request = new XMLHttpRequest();

    request.open('PUT', requestURL + tim.team_uuid);
    request.setRequestHeader('Content-type','application/json; charset=utf-8');
    request.responseType = 'json';
    

    request.onload = function ()
    {
	window.resp = request;
	alert("Promene sačuvane na serveru!");
    }
    request.send(data);
	
}

function izmeniClana(num, id)
{
	let clan = {};
	clan.first_name = window["first_name_"+id].innerHTML;
	clan.last_name = window["last_name_"+id].innerHTML;
	clan.email = window["email_"+id].innerHTML;
	clan.phone_number = window["phone_number_"+id].innerHTML;
	clan.school = window["school_"+id].innerHTML;
	clan.city = window["city_"+id].innerHTML;
	clan.id = id;
	clan.team_id = tim.id;

	tim.team_members[num] = clan;
	localStorage.setItem("login", JSON.stringify(tim));

	posaljiPromene();
}

function promenaOpstih()
{
    tim.name = imeTima.value;
    tim.description = opisTima.value;
    localStorage.setItem("login", JSON.stringify(tim));
    posaljiPromene(); 
}

change.addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    promenaOpstih();
    
});
