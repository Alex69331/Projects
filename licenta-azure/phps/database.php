<?php


$host = "localhost";
$username = "Alex";
$db_password = "12345678";
$database = "login_schema";

$conn = new mysqli($host, $username, $db_password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
