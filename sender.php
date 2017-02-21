<?php
$subject = "Заявка на настройку Яндекс.Директ "; //Subject:
$from_name = "Заявка"; //From:
$from_email = "info@igeneral-media.ru"; //From:
$tosend = "info@ig-media.ru";//"1@pyatko.ru";

$name = isset($_POST['uname'])?$_POST['uname']:$from_name;
$phone = $_POST['tel'];
$text = $_POST['utext'];
$email = isset($_POST['email'])?$_POST['email']:$from_email;
$formname = $_POST['title'];
$page = $_POST['url'];
$id = $_POST['id'];
$subject .= $id.': '.$formname;
if($id == 'CTA 12'){
	$subject = "Вопрос по настройке Яндекс.Директ ".$id.': '.$formname;
}
// $msg  = "<p><strong>".$subject."</strong></p>\r\n";
$msg = "<table border='2' cellpadding='10'>\r\n";

if ($name != '-' && !empty($name) && isset($_POST['uname'])) {
	$msg .= "<tr><td><p><strong>Имя:</strong></td><td> &nbsp;".$name."</p></td></tr>\r\n";
}

if ($email != '-' && !empty($email) && isset($_POST['email'])) {
	$msg .= "<tr><td><p><strong>E-mail:</strong></td><td> &nbsp;".$email."</p></td></tr>\r\n";
}

if ($phone != '-' && !empty($phone)) {
	$msg .= "<tr><td><p><strong>Телефон:</strong></td><td> &nbsp;".str_replace("  ", " ", str_replace("-", "", $phone))."</p></td></tr>\r\n";
}

if ($text != '-' && !empty($text)) {
	$msg .= "<tr><td><p><strong>Сообщение:</strong></td><td> &nbsp;".$text."</p></td></tr>\r\n";
}

if ($page != '-' && !empty($page)) {
	$msg .= "<tr><td><p><strong>Страница:</strong></td><td> &nbsp;<a href='".$page."'>".$page."</a></td></tr>\r\n";
}

if ($id != '-' && !empty($id) && !empty($formname) ) {
	$msg .= "<tr><td><p><strong>Форма:</strong></td><td> &nbsp;".$id.": ". $formname ."</p></td></tr>\r\n";
}

$msg .= "</table>";

$headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\n";
$headers .= "From: ".$name." <".$email.">\r\n";

if(mail($tosend, $subject, $msg, $headers)) {
	echo json_encode(array('result' => true));
} else {
	echo json_encode(array('result' => false));
}

?>