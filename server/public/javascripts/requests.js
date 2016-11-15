$(".form__login").on("submit", logIn);

function logIn(event) {

	var authlogin = document.getElementById("login").value;
	var passValue = document.getElementById("password").value;

		event.preventDefault();
		$.ajax({
			type: "POST",
			url: "/login",
			data: {login: authlogin, password: passValue},
		})
		.done(function (data) {
			var response = $.parseJSON(data).response;
			if (response == "done") window.location.replace("/me");
			if (response == "error") {
				$("#password")
					.css("box-shadow", "0 0 6px red")
					.val("")
					.attr("placeholder","Не верный пароль");
			}
		})
}

function logOut() {
	var date = new Date(0);
	document.cookie = "auth=; path=/; expires=" + date.toUTCString();
}