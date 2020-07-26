$(function(){
    var form = layui.form;
    var layer = layui.layer;
    getUserInfo()
    //获取用户基本信息
    function getUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                console.log(res);
                if (res.status!=0) {
                    return layer.msg(res.message)
                }
                renderAvatar(res.data)
            }
        });
    }
    //把用户的数据渲染到页面上
    function renderAvatar(user) {
        var name = user.nickname || user.userneme;
        console.log(name);
        $('#welcome').html('欢迎 ' + ' ' + name);
        if (user.user_pic != null) {
            $('.layui-nav-img').prop('src',user.user_pic).show();
            $('#userImg').hide();
        } else {
            var firstHtml = name[0].toUpperCase();
            $('#userImg"').show().html(firstHtml);
            $('.layui-nav-img').hide();
        }
    }
    //点击退出回到登录页
    $('#btnSet').on('click',function(){
        layer.confirm('确定要退出吗?', {icon: 3, title:'提示'}, function(index){
            location.href = 'login.html';
            localStorage.removeItem('token');
            layer.close(index);
          });
    })
})