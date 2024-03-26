<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once '../vendor/phpmailer/PHPMailer-master/src/PHPMailer.php';
require_once '../vendor/phpmailer/PHPMailer-master/src/SMTP.php';
require_once '../vendor/phpmailer/PHPMailer-master/src/Exception.php';

session_start();

$host = "localhost";
$username = "Alex";
$db_password = "12345678";
$database = "login_schema";

try {
    $conn = new mysqli($host, $username, $db_password, $database);
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);

        $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $user_data = $result->fetch_assoc();

            $token = bin2hex(random_bytes(32));

            $hashed_token = password_hash($token, PASSWORD_BCRYPT);

            $expires_at = date('Y-m-d H:i:s', strtotime('+2 hour'));

            $stmt = $conn->prepare("UPDATE users SET reset_token_hash = ?, reset_token_expires_at = ? WHERE email = ?");
            $stmt->bind_param("sss", $hashed_token, $expires_at, $email);
            $stmt->execute();

            $reset_link = "http://localhost:8080/phps/reset_password.php?token=" . urlencode($token);


            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com'; 
            $mail->SMTPAuth   = true;
            $mail->Username   = 'alexursa2@gmail.com'; 
            $mail->Password   = 'kckn ycuz kkip plvv'; 
            $mail->SMTPSecure = 'tls'; 
            $mail->Port       = 587; 

            // Set email parameters
            $mail->setFrom('alexursa2@gmail.com', 'SNAP');
            $mail->addAddress($user_data['email'], $user_data['username']);
            $mail->isHTML(true);
            $mail->Subject = 'Password Reset Instructions';
            $mail->Body    = "Click the following link to reset your password: <a href='$reset_link'>$reset_link</a>";

            // Send email
            $mail->send();

            echo "An email with instructions to reset your password has been sent to your email address.";
        } else {
            echo "Email address not found.";
        }
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

if (isset($conn)) {
    $conn->close();
}
?>
