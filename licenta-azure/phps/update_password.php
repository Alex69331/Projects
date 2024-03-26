<?php
session_start();

$host = "localhost";
$db_username = "Alex";
$db_password = "12345678";
$database = "login_schema";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST['email'];
    $username = $_POST['username']; 
    $password = $_POST['password']; 

    if (strlen($password) < 8) {
        die("Password must be at least 8 characters long.");
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $conn = new mysqli($host, $db_username, $db_password, $database);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("UPDATE users SET password = ?, reset_token_hash = NULL, reset_token_expires_at = NULL WHERE email = ? AND reset_token_hash IS NOT NULL AND username = ?");
$stmt->bind_param("sss", $hashed_password, $email, $username);


    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo "Password updated successfully.";
        } else {
            echo "Error: Either the email provided does not exist, the reset token is null, or the email and username do not match.";
        }
    } else {
        echo "Error updating password: " . $conn->error;
    }

    $conn->close();
} else {
    header("Location: reset_password_page.php");
    exit;
}
?>
