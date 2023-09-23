<?php
session_start();

$host = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbName = "test";

$conn = new mysqli($host, $dbUsername, $dbPassword, $dbName);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'];
$password = $_POST['password'];

// Using prepared statements to prevent SQL injection
$stmt = $conn->prepare("SELECT * FROM registration WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $password_hash = $row['password'];

    if (password_verify($password, $password_hash)) {
        $_SESSION['user_id'] = $row['id'];
        $_SESSION['user_email'] = $row['email'];
        // Redirect the user to a logged-in page
        header("Location: welcome.php");
        exit();
    } else {
        $_SESSION['login_error'] = "Invalid username or password.";
        header("Location: login.php"); // Redirect back to the login page with an error message
        exit();
    }
} else {
    $_SESSION['login_error'] = "Invalid username or password.";
    header("Location: login.php"); // Redirect back to the login page with an error message
    exit();
}

$stmt->close();
$conn->close();
?>
