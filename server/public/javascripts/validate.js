var patterns = {
	"email" : /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i,
	"name": /[A-Za-zА-Яа-яЁё]{3,}/,
	"lastName": /[A-Za-zА-Яа-яЁё]{3,}/,
	"password": /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
	"password_conf": /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
	"login": /^[a-zA-Z][a-zA-Z0-9-_\.]{4,20}$/,
	"birthDate": /(19|20)\d\d[- \/.](0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])/
	};

var hints = {
	"email": "Введите имейл в формате example@com.ua",
	"name": "Имя и Фамилия не должны содержать цифер, мин 3 буквы",
	"lastName": "Имя и Фамилия не должны содержать цифер, мин 3 буквы",
	"password": "Ошибка ввода пароля, пример пароля qWerty1",
	"password_conf": "Ошибка ввода пароля, пример пароля qWerty1",
	"login": "не менее 5, и не более 20 символов",
	"birthDate": "Введите дату в формате ГГГГ-ММ-ДД"
}

function validator(target) {

	$(target.form).submit(function(event){
	var err = 0;
	$(".warning").detach();
	var inputs = getInputsId(target.form);
	var password = document.getElementById("password").value;
	var password_conf = document.getElementById("password_conf").value;

		for (var key in inputs) {
			var source = inputs[key];
			var keys = Object.keys(inputs);
		
			if (key == "country") continue;
			if (key == "password") source = password;
			if (key == "password_conf") source = password_conf;

			if(!source.search(patterns[key])) {
				$('#'+key).css("box-shadow", "0 0 6px green");
			}else{
				$('#'+key).css("box-shadow", "0 0 6px red");
				$('#'+key).after("<span class='warning'>"+ hints[key] +"</span>")
				err++;
			}

			if (key == "password_conf") {
				if (password !== password_conf) {
					$("#password_conf").css("box-shadow", "0 0 6px red")
						.val("")
						.attr("placeholder","Пароль не совпадает");
				err++;
				}
			}	
		}
	err ? event.preventDefault() : true; 
	})
}

function getInputsId(target) {
	var values = {};
	$.each($(target).serializeArray(), function(i, field) {
		values[field.name] = field.value;
	})
	return values;
}


