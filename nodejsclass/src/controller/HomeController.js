class HomeController {
  home(req, res) {
    res.send("welcome to home page");
  }
}

module.exports = new HomeController();
