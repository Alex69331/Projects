<?php
session_start();

$host = "localhost";
$username = "Alex";
$db_password = "12345678";
$database = "login_schema";

$conn = new mysqli($host, $username, $db_password, $database);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
    $password = $_POST['password'];

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email address";
        exit(); 
    }

    if (strlen($password) < 8) {
        echo "Password must be at least 8 characters long";
        exit(); 
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "Email address already registered";
        exit(); 
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "Username already exists";
        exit(); 
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (email, username, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $email, $username, $hashedPassword);

    if ($stmt->execute()) {
        echo "Registration successful";
        exit();
    } else {
        echo "Error: Registration failed";
        exit();
    }

    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../styles/styles.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snap Register</title>
</head>
<body>
<div id="registerContainer">
      <img
        id="icon-cross"
        class="icon-cross2"
        src="../images/icon-cross.svg"
        alt=""
      />
      <h1>Register</h1>
      <form
        id="registrationForm"
        onsubmit="submitForm(); return false;"
        method="post"
      >
        <input
          maxlength="33"
          placeholder="Email"
          name="email"
          type="email"
          required
        />
        <input
          maxlength="23"
          placeholder="Username"
          name="username"
          type="text"
          required
        />
        <input
          maxlength="40"
          placeholder="Password"
          name="password"
          type="password"
          required
        />
        <button type="submit" id="signUpBtn">Sign Up</button>

        <div id="errorContainer"></div>
      </form>
      <hr />
      <h4>Or</h4>
      <h2>Already a member?</h2>
     <a href="../index.php"> <h3 id="signIn">Sign In</h3></a>
    </div>
    <script src="../scripts/script.js"></script>
</body>
</html>