<?php
// Make sure you have installed PHPMailer via Composer or manually
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../vendor/autoload.php'; // Adjust path as needed for PHPMailer

header('Content-Type: application/json');

$response = ['status' => '', 'message' => ''];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = trim($_POST['name'] ?? '');
    $email   = trim($_POST['email'] ?? '');
    $subject = trim($_POST['subject'] ?? '');
    $phone   = trim($_POST['phone'] ?? '');
    $message = trim($_POST['message'] ?? '');

    // Basic validation
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        $response['status'] = 'error';
        $response['message'] = 'Please fill in all required fields.';
        echo json_encode($response);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'ppeliance@gmail.com';       // Your Gmail
        $mail->Password   = 'libhibkewsitguxy';         // Your Gmail App Password
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom($email, $name);
        $mail->addAddress('ppeliance@gmail.com');        // Your receiving email

        // Content
        $mail->isHTML(true);
        $mail->Subject = htmlspecialchars($subject);

        $body  = "<strong>Name:</strong> " . htmlspecialchars($name) . "<br>";
        $body .= "<strong>Email:</strong> " . htmlspecialchars($email) . "<br>";
        if ($phone) $body .= "<strong>Phone:</strong> " . htmlspecialchars($phone) . "<br>";
        $body .= "<strong>Message:</strong><br>" . nl2br(htmlspecialchars($message));

        $mail->Body    = $body;
        $mail->AltBody = strip_tags($body);

        $mail->send();
        $response['status'] = 'success';
        $response['message'] = 'Your message has been sent successfully!';
    } catch (Exception $e) {
        $response['status'] = 'error';
        $response['message'] = "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }

    echo json_encode($response);
    exit;
}

// If not POST
$response['status'] = 'error';
$response['message'] = 'Invalid request.';
echo json_encode($response);
exit;