<?php

$email = $_POST['email'];
$password = $_POST['password'];
$user_type = $_POST['user_type'];

// Database connection
$conn = new mysqli('localhost', 'root', '', 'test');

if ($conn->connect_error) {
    die('Connection Failed: ' . $conn->connect_error);
} else {
    $password_hash = password_hash($_POST["password"], PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO registration (email, password, user_type) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $email, $password_hash, $user_type);
    $stmt->execute();
    echo "Registration Successfully...";
    header('Location: index.html'); // Use 'Location' with an uppercase L
    $stmt->close();
    $conn->close();
}
?>
