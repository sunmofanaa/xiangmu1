<?php 
	header("Content-type:text/html;charset=utf-8");
	// var_dump($_POST);
	/*
		定义一个统一的返回格式
	*/
	$responseData = array("code" => 0, "message" => "");

	$username = $_POST['username'];
	$password = $_POST['password'];

	/*
		简单的数据验证
	*/
	if(!$username){
		$responseData['code'] = 1;
		$responseData['message'] = "用户名不能为空";
		echo json_encode($responseData);
		exit;
	}
	if(!$password){
		$responseData['code'] = 2;
		$responseData['message'] = "密码不能为空";
		echo json_encode($responseData);
		exit;
	}

	/*
		天龙八部链接数据库，将数据插入到数据库中
	*/
	$link = mysqli_connect("127.0.0.1", "root", "123456abc");

	if(!$link){
		$responseData['code'] = 3;
		$responseData['message'] = "数据库连接失败";
		echo json_encode($responseData);
		exit;
	}

	mysqli_set_charset($link, "utf8");

	mysqli_select_db($link, "xiaomi");

	$str = md5(md5(md5($password).'beijing').'zhongguo');


	//准备sql语句进行登录
	$sql = "SELECT * FROM users WHERE username='{$username}' AND password='{$str}'";
	// echo $sql;

	$res = mysqli_query($link, $sql);
	//[mysql result]
	//取出第一行数据，判断数据是否存在，如果存在返回关联数组，否则返回false
	$row = mysqli_fetch_assoc($res);

	if(!$row){
		$responseData['code'] = 4;
		$responseData['message'] = "用户名或密码错误";
		echo json_encode($responseData);
		exit;
	}else{
		$responseData['message'] = "登录成功";
		$responseData["username"] = $row['username'];
		echo json_encode($responseData);
	}


	mysqli_close($link);
 ?>