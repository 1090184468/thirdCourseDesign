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
	$("#loginUsername").html($.cookie("username"))
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
        btn: ['确定','取消'],
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
            getModifyPwd()
        },
        cancel: function(index, layero){
            setEmpty();
			
        },
        yes: function (index) {
			
			if(lockMo==1||lockNew1==1||lockNew2==1){
				layer.msg('输入密码格式不正确', {time:2000,icon: 5,shift:6});
				return ;
			}
            confirmModifyPwd(index);
            return false;
            
        },btn2: function (index) {
			setEmpty();
			layer.close(index);
        }
    });
}
var lockMo=1;
var lockNew1=1;
var lockNew2=1;
function setEmpty(){
	$("#mopwd").val("")
			$("#mopwd-aux").css("display", "none")
			$("#newpwd1").val("")
			$("#newpwd1-aux").css("display", "none")
			$("#newpwd2").val("")
			$("#newpwd2-aux").css("display", "none")
}
function getModifyPwd() {
    var pwd;
    $("#mopwd").blur(function () {
        let mopwd = $("#mopwd").val().trim();
        if (mopwd.length == 0) {
            $("#mopwd-aux").css({
                display: "block",
                color: "#ff1010",
            }).html("请输入原密码")
			lockMo=1;
        } else {
            //发送ajax获得原密码 pwd
            pwd = 1;
 
            if (mopwd != pwd) {
                $("#mopwd-aux").css({
                    display: "block",
                    color: "#ff1010",
                }).html("密码不正确")
				lockMo=1;
            } else {
                $("#mopwd-aux").css({
                    display: "block",
                    color: "#5FB878"
                }).html("输入正确")
				lockMo=0;
            }
        }
    })
	var passwordPattern=/^[A-z][A-z0-9]{5,16}$/;
    var newpwd1 = $("#newpwd1").val().trim()
    $("#newpwd1").blur( function () {
        newpwd1 = $("#newpwd1").val().trim();
		
        if (newpwd1.length == 0) {
            $("#newpwd1-aux").css({
                display: "block",
                color: "#ff1010"
            }).html("请输入新密码")
			lockNew1=1;
        } else if(!passwordPattern.test(newpwd1)){
			$("#newpwd1-aux").css({
			    display: "block",
			    color: "#ff1010"
			}).html("密码格式不正确，需要6-16位字母数字组成并且由字母开头")
			lockNew1=1;
		} else {
            $("#newpwd1-aux").css({
                display: "block",
                color: "#5FB878"
            }).html("输入正确")
			lockNew1=0;
        }
		
    })
 
    $("#newpwd2").focus(()=> {
        let newpwd1 = $("#newpwd1").val().trim()
        if (newpwd1.length == 0) {
            $("#newpwd1-aux").css({
                display: "block",
                color: "#ff1010"
            }).html("请输入新密码")
			lockNew2=1
        }
    })
 
    $("#newpwd2").blur( function () {
        let newpwd2 = $("#newpwd2").val().trim()
        if (newpwd2.length == 0) {
            $("#newpwd2-aux").css({
                display: "block",
                color: "#ff1010"
            }).html("请输入新密码");
			lockNew2=1;
        } else if (newpwd1 != newpwd2) {
            $("#newpwd2-aux").css({
                display: "block",
                color: "#ff1010"
            }).html("两次输入不一致");
			lockNew2=1;
            
 
        } else if (newpwd1 == newpwd2 && newpwd1 == pwd) {
            $("#newpwd2-aux").css({
                display: "block",
                color: "#ff1010"
            }).html("新密码不能与原密码相同");
			lockNew2=1;
            $("#newpwd1-aux").css({
                display: "block",
                color: "#ff1010"
            }).html("新密码不能与原密码相同");
			lockNew2=1;
        } else if(!passwordPattern.test(newpwd1)){
			$("#newpwd1-aux").css({
			    display: "block",
			    color: "#ff1010"
			}).html("密码格式不正确，需要6-16位字母数字组成并且由字母开头")
			lockNew1=1;
		}else {
            $("#newpwd1-aux").css({
                display: "block",
                color: "#5FB878"
            }).html("输入正确")
            $("#newpwd2-aux").css({
                display: "block",
                color: "#5FB878"
            }).html("输入正确")
            $("#adduserlayer").data("new_pwd", newpwd1);
			lockNew1=0;
			lockNew2=0;
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
