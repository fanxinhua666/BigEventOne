$(function () {
    $('#link-reg').on('click', function () {
        $('.login-content').hide().siblings('.reg-content').show()
    })

    $('#link-login').on('click', function () {
        $('.reg-content').hide().siblings('.login-content').show()
    })

    let form = layui.form


    form.verify({
        // username: function(value, item){ //value：表单的值、item：表单的DOM对象
        //   if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
        //     return '用户名不能有特殊字符';
        //   }
        //   if(/(^\_)|(\__)|(\_+$)/.test(value)){
        //     return '用户名首尾不能出现下划线\'_\'';
        //   }
        //   if(/^\d+\d+\d$/.test(value)){
        //     return '用户名不能全为数字';
        //   }
        // },

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        repass:function(value){
          let val = $("#psw").val()

          if(val !== value){
              return '两次密码不相同，请重新输入'
          }
        }
    });

   //注册功能
   var layer = layui.layer;
   $("#form_reg").on("submit", function(e){
       //阻止表单默认提交
       e.preventDefault()
       //ajax发送异步提交
       $.ajax({
           type: 'post',
           url: '/api/reguser',
           data: {
               username: $("#form_reg [name=username]").val(),
               password: $("#form_reg [name=password]").val()
           },
           success: function(res) {
               //注册失败校验
               if(res.status != 0) {
                   return layer.msg(res.message)
                   $("#form_reg")[0].reset()
               }
               //注册成功，提示
               layer.msg(res.message)
               //触动切换到登录的a连接的点击行为
               $("#link-login").click()
               //清空表单
               $("#form_reg")[0].reset()
           }
       })
   })

   //登录
   $("#form_login").on("submit", function(e){
       e.preventDefault()

       $.ajax({
           type:'post',
           url:'/api/login',
           data: $(this).serialize(),
           success:function(res){
               //注册失败
               if(res.status != 0){
                   return layer.msg(res.message)
               }
               //注册成功提示
               layer.msg(res.message)
               //保存token
               localStorage.setItem("token", res.token)
               //页面跳转
               location.href = './index.html'
           }
       })
   })





})