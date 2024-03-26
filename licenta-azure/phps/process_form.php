<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once '../vendor/phpmailer/PHPMailer-master/src/PHPMailer.php';
require_once '../vendor/phpmailer/PHPMailer-master/src/SMTP.php';
require_once '../vendor/phpmailer/PHPMailer-master/src/Exception.php';


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $date = $_POST['date'];
    $time = $_POST['time'];
    $message = $_POST['message'];

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; 
        $mail->SMTPAuth   = true;
        $mail->Username   = 'alexursa2@gmail.com'; 
        $mail->Password   = 'kckn ycuz kkip plvv'; 
        $mail->SMTPSecure = 'tls'; 
        $mail->Port       = 587; 

        $mail->setFrom($email);
        $mail->addAddress('alexursa2@gmail.com'); 
        $mail->Subject = 'Meeting Scheduled';
        $mail->Body = "Name: $name\nEmail: $email\nDate: $date\nTime: $time\nMessage: $message";

        $mail->send();
        echo "Meeting scheduled successfully. We'll contact you shortly.";
    } catch (Exception $e) {
        echo "Failed to schedule the meeting. Please try again later. Error: {$mail->ErrorInfo}";
    }
} else {
    header("Location: home.html");
    exit;
}
?>
