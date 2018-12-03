var request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function () {
    var timovi = request.response;
    ispisiOpsteInformacije(timovi);
}

function ispisiOpsteInformacije(jsonObj) {
    console.log("radi ovo!");
    for (var i = 0; i < jsonObj.length; i++) {
        var elementNiza = jsonObj[i];

        var myDiv = document.createElement('div');
        var myH1 = document.createElement('h1');
        myH1.textContent = elementNiza['name'];
        listaTimova.appendChild(myH1);

        var myPar = document.createElement('p');
        myPar.textContent = 'Opis tima: ' + elementNiza['description'];
        listaTimova.appendChild(myPar);

        var clanovi = elementNiza['team_members'];
        ispisiClanove(clanovi);
        
        listaTimova.appendChild(document.createElement('br'));
    }
    myDiv.appendChild(document.createElement('br'));

}

function ispisiClanove(clanovi)
{
    console.log("radi i ovo!");
    let sadrzina = `<div class='row'>`;
    for (let j = 0; j < clanovi.length; j++)
    {
        sadrzina += `<div class="clanTima col-md-3 sivoprovidno">`;
		sadrzina += `Ime: ` + clanovi[j].first_name + "<br />";
		sadrzina += `Prezime: ` + clanovi[j].last_name + "<br />";
		sadrzina += `E-mail: ` + clanovi[j].email + "<br />";
		sadrzina += `Broj telefona: ` + clanovi[j].phone_number + "<br />";
		sadrzina += `Škola: ` + clanovi[j].school + "<br />"
		sadrzina += `Mesto škole: ` + clanovi[j].city + "<br />";
        sadrzina += `<hr /></div>`;
    }
    sadrzina += `</div><hr />`;

    listaTimova.innerHTML+=sadrzina;
}

