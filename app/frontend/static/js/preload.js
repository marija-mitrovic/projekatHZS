function headerLogin()
{
	if (localStorage.getItem("login") !== null)
	{
		window.tim = JSON.parse(localStorage.getItem("login"));
		loginCaption.innerHTML = "Tim: "+tim.name;
		return true;
		
	}
	return false;
}

var hostName = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
var requestURL = hostName+"/teams/";
