$(function(){
    $('#link_login').on('click',function(){
        $('#login').hide();
        $('#reg').show();
    })
    $('#link_reg').on('click',function(){
        $('#login').show();
        $('#reg').hide();
    })
    var layer = layui.layer;
    var form = layui.form;
    // 监听注册表单事件
    $('#reg').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: {
                username: $('#reg [name="username"]').val(),
                password: $('#reg [name="password"]').val()
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('创建账号成功!');
                $('#link_reg').click();
            }
        });
    })
    form.verify({
        psw : [
            /^[\S]{6,16}$/,
            "请输入6-16位密码"
        ],
        pswed:function(value){
            var val = $('#reg [name="password"]').val();
            if (val != value) {
                return '俩次密码输入不一致';
            }
        }
    })
    //监听登录表单事件
    $('#login').submit(function(e){
        e.preventDefault();
        console.log($(this).serialize());
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg("登录成功,将在三秒后跳转");
                localStorage.setItem('token',res.token);
                setTimeout(function(){
                    location.href = "index.html";
                },3000);
            }
        });
    })
})