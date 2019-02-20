var formLead = document.querySelector('#form-lead');
var btnSubmit = document.querySelector('#form-submit');


// submit do form
formLead.addEventListener('submit', function(e) {
	e.preventDefault();

	btnSubmit.textContent = 'Enviando...';
	btnSubmit.disabled = true;


	//2018-03-25 12:20:44
	var userData = {
		email: formLead.email.value,
		nome: formLead.nome.value,
		tipo: formLead.tipo.value,
		data_hora: getFullTime(new Date())
	}

	var userIp = $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
		userData.ip = data.geobytesipaddress
		return submitLead( userData );
	});
});


// função para salvar os dados no firebase
function submitLead(userData) {
	db.collection('leads').add( userData ).then( submitCompleted() );
}


// função que completa o envio
function submitCompleted() {
	alert('Obrigado por se cadastrar.');

	btnSubmit.textContent = 'Enviar';
	btnSubmit.disabled = false;

	formLead.email.value = '';
	formLead.nome.value = '';
}



// formatar data
function addZeroBefore(n) {
	return (n < 10 ? '0' : '') + n;
}

function getFullTime(time) {
	return time.getFullYear() + '-' + addZeroBefore(time.getMonth()+1) + '-' + addZeroBefore(time.getDate()) + ' ' + addZeroBefore(time.getHours()) + ':' + addZeroBefore(time.getMinutes()) + ':' + addZeroBefore(time.getSeconds());
}
