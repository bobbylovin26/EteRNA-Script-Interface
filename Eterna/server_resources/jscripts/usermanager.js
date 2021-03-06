// Generated by CoffeeScript 1.3.3
(function() {

  this.UserManager = {
    login_uid_: null,
    login_user_role_: null,
    set_user: function(uid, role) {
      this.login_uid_ = uid;
      return this.login_user_role_ = role;
    },
    get_current_uid: function() {
      return this.login_uid_;
    },
    get_current_role: function() {
      return this.login_user_role_;
    },
    logout: function() {
      var url;
      url = Application.LOGOUT_URL;
      if (url === null) {
        Utils.display_error("logout url not specified in UserManager.logout");
        return;
      }
      Overlay.set_loading("로그아웃 중입니다");
      Overlay.show();
      return AjaxManager.query("GET", url, null, function() {
        return location.reload(true);
      }, function() {
        Utils.display_error("로그아웃 실패 - 들어올땐 마음대로였겠지만 나갈때는 아니란다");
        return Overlay.hide();
      });
    }
  };

}).call(this);
