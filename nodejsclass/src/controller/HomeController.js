

class HomeController {
  home(req, res) {

    const user={
        name:'webskitters',
        age:20,
        course:'nodejs',
        email:'g5rI3@example.com'
    }
    res.render('index',{
        title:'home page',
        data:user

    });
  }

  about(req, res) {
    res.render('about');
  }
}

module.exports = new HomeController();
