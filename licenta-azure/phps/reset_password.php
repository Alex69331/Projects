<?php
session_start();
$host = "localhost";
$db_username = "Alex";
$db_password = "12345678";
$database = "login_schema";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user = $_POST['username']; 
    $email = $_POST['email'];
    $password = $_POST['password']; 
    if (strlen($password) < 8) {
        die("Password must be at least 8 characters long.");
    }

    $conn = new mysqli($host, $db_username, $db_password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt_check = $conn->prepare("SELECT reset_token_hash FROM users WHERE username = ? AND email = ? AND reset_token_hash IS NOT NULL");
    $stmt_check->bind_param("ss", $username, $email);
    $stmt_check->execute();
    $stmt_check->store_result();

    if ($stmt_check->num_rows > 0) {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $conn->prepare("UPDATE users SET password = ? WHERE email = ?");
        $stmt->bind_param("ss", $hashed_password, $email);

        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                '<span style="color: blue;">Password updated successfully.</span>';
            } else {
                echo '<span style="color: red;">Reset token is null or email not found.</span>';
          
            }
        } else {
            '<span style="color: red;">Error updating password: ' . $conn->error . '</span>';
         }
    } else {
        echo '<span style="color: red;">Reset token is null or email not found.</span>';
    }

    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    
<style>
    input{
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        border: none;
        padding: 0.2rem 0;
        border-radius: 5px;
        width: 100%;
        
        text-indent: 10px;
    }
    #resetPass-div{
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        justify-content: center;
        text-align: center;
        align-items: center;
        display: flex;
        flex-direction: column;
        padding: 2rem;
        border-radius: 15px;
        max-width: 200px;
        margin: auto;
        margin-top: 8rem;
        background: linear-gradient(
          to left,
          hsl(192, 100%, 67%),
          hsl(280, 87%, 65%)
        );
        min-height: 250px;
    }
    #resetPass-div label{
        width: 100%;
        text-align: left;
        justify-content: left;
        float: left;
        margin: auto;
    }
    #resetPass-div button{
    cursor: pointer;
        width: 100%;
        border: none;
        border-radius: 5px;
        padding: 0.5rem;
    }
    #resetPass-div button:hover{
        transition: 0.4s;
        background-color: hsl(192, 100%, 87%)
    }
    #resetPass-div h1{
        font-size: 25px;
    }
    #passChanged{
        margin-top: 0.5rem;
        font-size: 15px;
    }
</style>
</head>
<body>
    <div id='resetPass-div'>
    <h1>Reset Password</h1>
    <form action="../phps/update_password.php" method="post">
        <label for="username">Enter your username:</label><br>
        <input type="text" id="username" name="username" required><br>

        <label for="email">Enter your email:</label><br>
        <input type="email" id="email" name="email" required><br>

        <label for="password">Enter your new password:</label><br>
        <input minlength="8" type="password" id="reset-password" name="password" required><br>
        <button type="submit">Reset Password</button>
        <div id="passChanged"></div>
    </form>
    </div>
    <script>
      document
        .querySelector("form")
        .addEventListener("submit", function (event) {
          var form = this;
            event.preventDefault();
          var formData = new FormData(form);

          fetch(form.action, {
            method: form.method,
            body: formData,
          })
            .then((response) => response.text())
            .then((data) => {
              var passChanged = document.getElementById("passChanged");
              passChanged.innerHTML = data;
              if (data.includes("Password updated successfully.")) {
              setTimeout(function () {
              window.location.href = "../index.php";
              }, 3000);
           }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });
    </script>
</body>
</html>