function exit(){
	
	$.removeCookie("username");
	$.removeCookie("TOKEN");
	window.location.href="login.html"
}

$(".Header").load("header.html",function(){
	document.getElementById("backToIndex").onclick = function() {
		window.location.href = "index.html";
	}
	document.getElementById("backToIndex").onmouseover = function() {
		this.style.cursor = "pointer";
	}
	$("#exit").click(function() {
		exit();
	})
	$(".Left").load("left.html",function(){
		if($.cookie("type")==0||$.cookie("type")==null){
			$(".notauthority").remove(); 
		} 
		layui.use('element', function(){
		  var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
		  //监听导航点击
		  element.on('nav(demo)', function(elem){
		    //console.log(elem)
		    //layer.msg(elem.text());
		  });
		});
	});
})

$("#modifyPasswordLayer").load("modifyPasswordLayer.html",function(){
})

function showModifyLayer() {
    let index = layer.open({
        type: 1,
        btn: ['取消','确定'],
        title: "修改密码",
        area: ["660px", "320px"],
        content: $("#modifypwdlayer"),
        //++enter
        success: function(layero, index){
            $(document).on('keydown', function(e){
                if(e.keyCode == 13){
                    deleteFile(index);
                }
            })
			 $("#mopwd").val($.cookie("password"))
            getModifyPwd()
        },
        cancel: function(index, layero){
            $("#mopwd").val("")
            $("#mopwd-aux").css("display", "none")
            $("#newpwd1").val("")
            $("#newpwd1-aux").css("display", "none")
            $("#newpwd2").val("")
            $("#newpwd2-aux").css("display", "none")
			
        },
        yes: function (index) {
			$("#mopwd").val("")
			$("#mopwd-aux").css("display", "none")
			$("#newpwd1").val("")
			$("#newpwd1-aux").css("display", "none")
			$("#newpwd2").val("")
			$("#newpwd2-aux").css("display", "none")
            layer.close(index);
        },btn2: function (index) {
			$("#mopwd").val("")
			$("#mopwd-aux").css("display", "none")
			$("#newpwd1").val("")
			$("#newpwd1-aux").css("display", "none")
			$("#newpwd2").val("")
			$("#newpwd2-aux").css("display", "none")
            confirmModifyPwd(index)
            return false
        }
    });
}
function getModifyPwd() {
    var pwd
    $("#mopwd").blur(function () {
        let mopwd = $("#mopwd").val().trim();
        if (mopwd.length == 0) {
            $("#mopwd-aux").css({
                display: "block",
                color: "#ff1010",
            }).html("请输入原密码")
        } else {
            //发送ajax获得原密码 pwd
            pwd = 1
 
            if (mopwd != pwd) {
                $("#mopwd-aux").css({
                    display: "block",
                    color: "#ff1010",
                }).html("密码不正确")
            } else {
                $("#mopwd-aux").css({
                    display: "block",
                    color: "#5FB878"
                }).html("输入正确")
            }
        }
    })
 
    var newpwd1 = $("#newpwd1").val().trim()
    $("#newpwd1").blur( function () {
        newpwd1 = $("#newpwd1").val().trim()
        if (newpwd1.length == 0) {
            $("#newpwd1-aux").css({
                display: "block",
                color: "#ff1010"
            }).html("请输入新密码")
        } else {
            $("#newpwd1-aux").css({
                display: "block",
                color: "#5FB878"
            }).html("输入正确")
        }
    })
 
    $("#newpwd2").focus(()=> {
        let newpwd1 = $("#newpwd1").val().trim()
        if (newpwd1.length == 0) {
            $("#newpwd1-aux").css({
                display: "block",
                color: "#ff1010"
            }).html("请输入新密码")
        }
    })
 
    $("#newpwd2").blur( function () {
        let newpwd2 = $("#newpwd2").val().trim()
        if (newpwd2.length == 0) {
            $("#newpwd2-aux").css({
                display: "block",
                color: "#ff1010"
            }).html("请输入新密码")
        } else if (newpwd1 != newpwd2) {
            $("#newpwd2-aux").css({
                display: "block",
                color: "#ff1010"
            }).html("两次输入不一致")
            $("#newpwd1-aux").css({
                display: "block",
                color: "#ff1010"
            }).html("两次输入不一致")
 
        } else if (newpwd1 == newpwd2 && newpwd1 == pwd) {
            $("#newpwd2-aux").css({
                display: "block",
                color: "#ff1010"
            }).html("新密码不能与原密码相同")
            $("#newpwd1-aux").css({
                display: "block",
                color: "#ff1010"
            }).html("新密码不能与原密码相同")
        } else {
            $("#newpwd1-aux").css({
                display: "block",
                color: "#5FB878"
            }).html("输入正确")
            $("#newpwd2-aux").css({
                display: "block",
                color: "#5FB878"
            }).html("输入正确")
            $("#adduserlayer").data("new_pwd", newpwd1)
        }
    });
}
function confirmModifyPwd(index) {
    let newpwd = $("#adduserlayer").data("new_pwd")
    //发送ajax
 
    $("#mopwd").val("")
    $("#mopwd-aux").css("display", "none")
    $("#newpwd1").val("")
    $("#newpwd1-aux").css("display", "none")
    $("#newpwd2").val("")
    $("#newpwd2-aux").css("display", "none")
    layer.close(index);
}
