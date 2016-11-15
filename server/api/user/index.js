module.exports = function (req, res, err) {
	res.render("me", {title: "Личный кабинет", name: req.user.name, lastName: req.user.lastName})
}
