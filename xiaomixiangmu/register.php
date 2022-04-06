<?php
    header('content-type:text/html;charset="utf-8"');

    //定义一个统一的返回格式
    $responseData = array("code" => 0, "message" => "");


    // var_dump($_POST);
    //将前端传输到后端的数据全部加载在页面上
    $username = $_POST['username'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];
    $createTime = $_POST["createTime"];
    

    //先给所有获取到的数据做一个简单的表单验证
    if(!$username){
        $responseData['code'] = 1;
        $responseData["message"] = "用户名不能为空";
        //将数据按统一数据返回格式返回
        echo json_encode($responseData);
        exit;
    }

    if(!$password){
        $responseData['code'] = 2;
        $responseData["message"] = "密码不能为空";
        //将数据按统一数据返回格式返回
        echo json_encode($responseData);
        exit;
    }
    if($password != $repassword){
        $responseData['code'] = 3;
        $responseData["message"] = "两次输入密码不一致";
        //将数据按统一数据返回格式返回
        echo json_encode($responseData);
        exit;
    }

    //接着判断用户名是否已经被注册
    //天龙八部链接数据库
    $link = mysqli_connect("127.0.0.1", "root", "123456abc");

    //判断数据库是否链接成功
    if(!$link){
        $responseData['code'] = 4;
        $responseData["message"] = "服务器忙";
        //将数据按统一数据返回格式返回
        echo json_encode($responseData);
        exit;
    }
    mysqli_set_charset($link, "utf8");

    mysqli_select_db($link, "xiaomi");


    //准备sql验证是否已经被注册
	$sql = "SELECT * FROM users WHERE username='{$username}'";

	$res = mysqli_query($link, $sql);

	$row = mysqli_fetch_assoc($res);

	if(!$row){
		/*
			密码要加密
		*/
		$str = md5(md5(md5($password).'beijing').'zhongguo');
		//准备sql语句进行注册
		$sql2 = "INSERT INTO users(username,password,createTime) VALUES('{$username}','{$str}',{$createTime})";
       
        $res = mysqli_query($link, $sql2);
		if($res){
			$responseData['message'] = "注册成功";
			echo json_encode($responseData);
		}else{
			$responseData['code'] = 5;
			$responseData['message'] = "注册失败";
			echo json_encode($responseData);
		}
	}else{
		$responseData['code'] = 6;
		$responseData['message'] = "用户名重名";
		echo json_encode($responseData);
		exit;
	}

	mysqli_close($link);
?>