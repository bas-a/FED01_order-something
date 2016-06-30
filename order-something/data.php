<?php

session_start();

$host = "localhost";
$db_username = "root";
$db_password = "root";
$db_name = "webshop_orders";
$db = mysqli_connect($host, $db_username, $db_password, $db_name)or die("Cannot connect to database");

if (mysqli_connect_error()) {
    die('Connect Error ('.mysqli_connect_errno().') '.mysqli_connect_error());
}

$products = [];

$sql = "SELECT * FROM `products`";
$result = mysqli_query($db, $sql);

while($data = mysqli_fetch_assoc($result)) {
    array_push($products ,$data);
}

echo json_encode($products);