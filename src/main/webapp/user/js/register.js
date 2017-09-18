$(document).ready(
		function() {
			// 字符验证
			jQuery.validator.addMethod("stringCheck", function(value, element) {
				return this.optional(element)
						|| /^[\u0391-\uFFE5\w]+$/.test(value);
			}, "只能包括中文字、英文字母、数字和下划线");
			// 中文字两个字节
			jQuery.validator.addMethod("byteRangeLength", function(value,
					element, param) {
				var length = value.length;
				for (var i = 0; i < value.length; i++) {
					if (value.charCodeAt(i) > 127) {
						length++;
					}
				}
				return this.optional(element)
						|| (length >= param[0] && length <= param[1]);
			}, "请确保输入的值在3-15个字节之间(一个中文字算2个字节)");

			// 身份证号码验证
			jQuery.validator.addMethod("isIdCardNo", function(value, element) {
				return this.optional(element)
						|| checkIdCardNo(value);
			}, "请正确输入您的身份证号码");

			// 手机号码验证
			jQuery.validator.addMethod("isMobile", function(value, element) {
				var length = value.length;
				var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
				return this.optional(element)
						|| (length == 11 && mobile.test(value));
			}, "请正确填写您的手机号码");

			// 电话号码验证
			jQuery.validator.addMethod("isTel", function(value, element) {
				var tel = /^\d{3,4}-?\d{7,9}$/; // 电话号码格式010-12345678
				return this.optional(element) || (tel.test(value));
			}, "请正确填写您的电话号码");

			// 联系电话(手机/电话皆可)验证
			jQuery.validator.addMethod("isPhone", function(value, element) {
				var length = value.length;
				var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
				var tel = /^\d{3,4}-?\d{7,9}$/;
				return this.optional(element)
						|| (tel.test(value) || mobile.test(value));

			}, "请正确填写您的联系电话");

			// 邮政编码验证
			jQuery.validator.addMethod("isZipCode", function(value, element) {
				var tel = /^[0-9]{6}$/;
				return this.optional(element) || (tel.test(value));
			}, "请正确填写您的邮政编码");

			// 开始验证
			$('#registerForm').validate({
				submitHandler : function(form) {
					jQuery(form).ajaxSubmit({
								
								type : "POST",
								dataType : "json",
								url : "sysuser/register",
								success : function(json) {

									try {
										$('#registerForm').skynetShadowBox('hide');
										if (json.result) {
											skynetDialog.msg(json.msg, json.ico, null, function() {
												skynetDialog.close();
												window.location.reload();
											});
										} else {
											skynetDialog.msg(json.msg, json.ico, null);
										}
									} catch (err) {
										skynetDialog.msg("系统错误，请联系管理员!", "error", null);
									}
								}	
								
							});
		
				},
				
				rules : {
					'user.name' : {
						required : true,
						stringCheck : true,
						byteRangeLength : [ 3, 15 ]
					},
					'user.dept' : {
						required : true,
						stringCheck : true
					},
					'user.phone' : {
						required : true,
						isPhone : true
					},
					'user.address' : {
						required : true,
						stringCheck : true,
						byteRangeLength : [ 3, 100 ]
					},
					'user.idcard' : {
						required : true,
						isIdCardNo : true

					},
					'user.pno' : {
						required : true,
						stringCheck : true

					},
					'user.password' : {
						required : true,
						byteRangeLength : [ 6, 20 ]
					},
					'confirmPsw' : {
						required : true,
						equalTo : "#psw"
					}
					
				},

				messages : {
					'user.name' : {
						required : "请填写用户名",
						stringCheck : "用户名只能包括中文字、英文字母、数字和下划线",
						byteRangeLength : "用户名必须在3-15个字符之间(一个中文字算2个字符)"
					},
					'user.dept' : {
						required : "请填写您的单位",
						stringCheck : "单位名只能包括中文字、英文字母、数字和下划线"
					},
					'user.email' : {
						required : "<font color=red>请输入一个Email地址</fond>",
						email : "请输入一个有效的Email地址"
					},
					'user.phone' : {
						required : "请输入您的联系电话",
						isPhone : "请输入一个有效的联系电话"
					},
					'user.pno' : {
						required : "请输入您的警官证",
						stringCheck : "请输入一个有效的警官证"
					},
					'user.idcard' : {
						required : "请输入身份证号",
						isIdCardNo : "请输入正确的身份证号"
					},
					'user.password' : {
						required : "请输入登陆密码",
						byteRangeLength : "密码必须大于6位"
					},
					'confirmPsw' : {
						required : "请再次输入登陆密码",
						equalTo : "两次输入的密码不一致"
					}
				},

				focusInvalid : false,
				onkeyup : false,
				errorPlacement : function(error, element) {
					error.appendTo(element.parent());
				},
				errorElement : "em",
				error : function(label) {
					label.text(" ").addClass("error");
				}
			});

		});

function checkIdCardNo(value){
	
	var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
	return pattern.test(value);
}

//验证手机号 
function isMobile(phone) { 
	var pattern = /^1[34578]\d{9}$/; 
	return pattern.test(phone); 
} 
