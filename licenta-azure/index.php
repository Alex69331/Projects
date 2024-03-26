<?php
// Include database configuration and connect to the database
session_start();
$host = "localhost";
$username = "Alex";
$db_password = "12345678";
$database = "login_schema";

$conn = new mysqli($host, $username, $db_password, $database);

// Handle login form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $hashedPassword = $row['password'];

        if (password_verify($password, $hashedPassword)) {
            $_SESSION['user_id'] = $row['user_id'];

            echo "success";
            exit();
        } else {
            echo "Username or password is invalid.";
            exit();
        }
    } else {
        echo "Username or password is invalid.";
        exit();
    }
    $stmt->close();
}

// Close connection
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="../styles\styles.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snap Login</title>
    <script type='text/javascript'>
        function preventBack(){window.history.forward()};
        setTimeout('preventBack()',0);
        window.onunload=function(){null;}
    </script>
</head>
<body>
<div id="loginContainer">
      <form id="loginForm" onsubmit="submitForm2(); return false;" method="post">
        <img id="icon-cross" src="../images/icon-cross.svg" alt="" />
        <h1>Login</h1>
        <input
          maxlength="23"
          placeholder="Username"
          id="username"
          name="username"
          type="text"
        />
        <input
          maxlength="40"
          placeholder="Password"
          id="password"
          name="password"
          type="password"
        />
        <a class="forgotPass" href="test_email.html">Forgot Password?</a>
        <button type="submit" id="login" name="login">Login</button>
        <div id="errorLogin"></div>
      </form>
      <div class="loginDownInfo">
        <h4>Don't have an account?</h4>
        <a href="../phps/register.php"><h3  id="signUp"> Sign Up</h3></a>
      </div>
    </div>
    <script src="../scripts/script.js"></script>
</body>
</html>