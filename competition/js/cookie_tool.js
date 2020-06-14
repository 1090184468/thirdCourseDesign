function exit(){
	
	$.removeCookie("username");
	$.removeCookie("TOKEN");
	window.location.href="login.html"
}
$(".Left").load("left.html",function(){
	if($.cookie("type")==0||$.cookie("type")==null){
		$(".notauthority").remove(); 
	} 
});
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
})