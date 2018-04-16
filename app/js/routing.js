var Render = {
  loginPage: function () {
    this.createRoute('views/pages/login.hbs', App.wrapper);
  },

  profilePage: function (data) {
    var context = {
      firstName: data.profile.firstname,
      lastName: data.profile.lastname
    };
    // this.createRoute('views/pages/index.hbs', App.wrapper);

    this.createRoute('views/pages/profileLeftInfo.hbs', App.sectionLeftInfo, context);
    this.createRoute('views/pages/profileLeftAbout.hbs', App.sectionLeftAbout, context);
    this.createRoute('views/pages/profileLeftAlbums.hbs', App.sectionLeftAlbums, context);
    this.createRoute('views/pages/profileCenter.hbs', App.sectionCenter, context);
    this.createRoute('views/pages/profileRightFriends.hbs', App.sectionRightFriends, context);
    this.createRoute('views/pages/profileRightSponsored.hbs', App.sectionRightSponsored, context);

    this.createRoute('views/pages/footer.hbs', App.footer, context);
    
  },

  registerPage: function () {
    this.createRoute('views/pages/register.hbs', App.wrapper);
  },

  forgotPassword: function () {
    this.createRoute('views/pages/returnPas.hbs', App.wrapper);
  },


  // createAlbum: function(){
  //   this.createRoute('views/modules/CreateAlbum.hbs', App.section);    
  // },

  // albumsPage: function () {
  //   this.createRoute('views/pages/albums.hbs', App.wrapper);
  // },

  // albumPage: function (album) {
  //   this.createRoute('views/pages/album.hbs', App.wrapper, album);
  // },

  // friendsList: function(data){
  //   var friends = data.friends[i];
  //   var context = {
  //     id: data.friends.id,
  //     lastname: friends.lastname,
  //     firstname:friends.firstname,
  //     quote:friends.quote,
  //     photo:friends.photo,
  //     lived:friends.lived,
  //     form:friends.from, 
  //     went:friends.went
  //   };

  //   this.createRoute('views/pages/friendsList.hbs', App.friendsList, context);
  // },


  // searchResult:function(){
  //    this.createRoute('views/modules/header-nav-authorized.hbs',  App.sectionCenter);
  // }


  navUser: function () {
    this.createRoute('views/modules/header-nav-authorized.hbs', App.header);
  },

  createProfile: function(tab){
    this.createRoute('views/pages/createProfile.hbs', App.section, null, tab);
    setTimeout(function(){
      $('[data-tab="profile"]').trigger('click');
    }, 100);
  },


  createRoute: function (url, container, context, tab) {
    var template;

    $.get(url, function (response) {
      template = Handlebars.compile(response);

      if(context) {
        template = template(context);
      }
      container.html(template);
      if (tab) {
        $(tab).trigger('click');
      }
    });
  }
};