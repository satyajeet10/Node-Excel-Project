(function () {
	var currentUrl = window.location.pathname;
	var lastItem = currentUrl.split("/").pop(-1);
	var role = localStorage.role;
	var menuList
	if (role=="client"){
		menuList = [{urlName:"clientUpload",icon: "fas fa-fw fa-upload",name:"Upload"},{urlName:"clientDetail",icon: "fa fa-user",name:"Client"}];
	} else if(role=="backend"){
		menuList = [{urlName:"clientDetail",icon: "fa fa-user",name:"Client"}];
	} else{
		menuList = [{urlName:"clientUpload",icon: "fas fa-fw fa-upload",name:"Upload"},
	                {urlName:"clientDetail",icon: "fa fa-user",name:"Client"}];
	}
	
	var sideMenu;
	menuList.forEach((item)=>{
		var objMenu = item;
		var activeLink 
		if (lastItem==objMenu.urlName){
			activeLink = "active"
		} else {
			activeLink = ""
		}
		sideMenu+="<li class='nav-item "+activeLink+"'><a class='nav-link' href='"+objMenu.urlName+"'><i class='"+objMenu.icon+"'></i> <span>"+objMenu.name+"</span></a></li>"
	});
	$(".sidebar").html(sideMenu);
	$(".user_id").html("Signed in as<br><strong>"+localStorage.username+"</strong>");
	
	$("#changePasswordForm").submit(function(event){
		event.preventDefault();
		let oldPass = $("#oldPassword").val();
		let newPass = $("#newPassword").val();
		let newPass1 = $("#reNewPassword").val();
		if (newPass === newPass1){
		  $.ajax({
			  	 url: "/ExcelUpload/excel/updatePassword",
			  	 type: "POST",
			  	 data: {
			  		 id: localStorage.id,
			  		 newPassword: newPass,
			  		 oldPassword: oldPass
			  	 },
			  	 success: function(response){
			  		 let result = JSON.parse(response);
			  		 if (result.reply=="success"){
			  			 localStorage.password=newPass;
			  			getNotify('success','fa fa-check-circle',"Password Changed Successfully");
			  			$("#changePasswordModal").modal('hide')
			  			$("#changePasswordForm")[0].reset();
			  		 }else {
			  			getNotify('danger','fas fa-times-circle',"Password Changed Failed!! Please try again");
			  		 }
			  	 },
			  	 error: function (request, status, error) {
        			getNotify('danger','fas fa-times-circle',request.responseText);
			  	 }
		  })
		} else {
		  getNotify('danger','fas fa-times-circle',"New Password not Matching");
		}
	})
	
})();

function getNotify(type,icon,message){
	$.notify({
    	// options
    	icon: icon,
    	message: message
    },{
    	// settings
    	element: 'body',
    	position: null,
    	type: type,
    	allow_dismiss: true,
    	newest_on_top: false,
    	showProgressbar: true,
    	placement: {
    		from: "top",
    		align: "right"
    	},
    	offset: 20,
    	spacing: 10,
    	z_index: 2000,
    	delay: 5000,
    	timer: 1000,
    	mouse_over: null,
    	animate: {
    		enter: 'animated fadeInDown',
    		exit: 'animated fadeOutUp'
    	},
    	icon_type: 'class',
    	template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
    		'<button type=button aria-hidden=true class=close data-notify=dismiss>x</button>' +
    		'<span data-notify="icon"></span> ' +
    		'<span data-notify="title">{1}</span> ' +
    		'<span data-notify="message">{2}</span>' +
    		'<div class="progress" data-notify="progressbar">' +
    			'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
    		'</div>' +
    		'<a href="{3}" target="{4}" data-notify="url"></a>' +
    	'</div>' 
    });
}