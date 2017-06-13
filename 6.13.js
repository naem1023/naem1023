var nickname ="";
var msgRef = firebase.database().ref('msg');

$(document).ready(function(){
	checkNickname();
});

function checkNickname(){
	if(nickname == ""){
		let returnValue = prompt("닉네임을 입력해주세요.", "");
		nickname = returnValue;
	}

	msgRef.on('child_added', function(snapshot){
		addMsg(snapshot.val().name, snapshot.val().msg, snapshot.val().date);
	})
}



function checkSentBtn(){
	let msg = $("#msgArea").val();
	if(msg.length > 0){
		$("#msgArea + a").addClass("active");
	}
	else{
		$("#msgArea + a").removeClass("active");
	}
}

$("#msgArea").on("keyup", function(){
	checkSentBtn();
});

function addMsg(nick, msg, date){
	let clone = $(".msg_tmp").clone();
	clone.html(clone.html().replace("[[name]]", nick));
	clone.html(clone.html().replace("[[msg]]", msg));
	clone.html(clone.html().replace("[[date]]", date));
	clone.removeClass("msg_tmp");
	clone.addClass("msg");
	if(nick == nickname){
		clone.addClass("right");
	}
	else{
		clone.addClass("left");
	}

	$("#log").append(clone);
	$("#log").scrollTop($("#log")[0].scrollHeight);
}

function sendMsg(){
	let msg = $("#msgArea").val();
	if(msg.length > 0){
		let now = new Date();
		let dateStr = now.toLocaleString();
		msgRef.push({
			msg : msg,
			date : dateStr,
			name : nickname
		});

		$("#msgArea").val("");
		$("#msgArea").focus();
		checkSentBtn();
	}
	else{
		alert("메시지를 입력해주세요.");
	}
}