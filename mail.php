<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require './mailer/Exception.php';
require './mailer/PHPMailer.php';
require './mailer/SMTP.php';

// JSON response headers
header('Content-Type: application/json');

// Utility functions
function sanitize_input($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

function has_header_injection($str) {
    return preg_match("/[\r\n]/", $str);
}

// Get and sanitize POST data
$name    = sanitize_input($_POST['name'] ?? '');
$phone   = sanitize_input($_POST['phone'] ?? '');
$service = sanitize_input($_POST['service'] ?? '');
$message = sanitize_input($_POST['message'] ?? '');

// Validate input
$errors = [];

if (empty($name)) {
    $errors[] = "Name is required.";
} elseif (has_header_injection($name)) {
    $errors[] = "Invalid characters in name.";
}

if (!preg_match('/^[6-9]\d{9}$/', $phone)) {
    $errors[] = "A valid 10-digit Indian phone number is required.";
} elseif (has_header_injection($phone)) {
    $errors[] = "Invalid characters in phone.";
}

if (empty($service)) {
    $errors[] = "Service is required.";
} elseif (has_header_injection($service)) {
    $errors[] = "Invalid characters in service.";
}

// Handle validation errors
if (!empty($errors)) {
    echo json_encode([
        "status" => "error",
        "errors" => $errors
    ]);
    exit;
}

// Proceed with PHPMailer
$mail = new PHPMailer(true);

try {
    // SMTP settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.yourdomain.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'your_email@yourdomain.com';
    $mail->Password   = 'your_password';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Recipients
    $mail->setFrom('your_email@yourdomain.com', 'Website Form');
    $mail->addAddress('recipient@example.com', 'Admin');

    // Email content
    $mail->isHTML(true);
    $mail->Subject = "New Inquiry from $name";
    $mail->Body = "
        <h3>New Service Inquiry</h3>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Phone:</strong> {$phone}</p>
        <p><strong>Service:</strong> {$service}</p>
        <p><strong>Message:</strong><br>" . nl2br($message) . "</p>
    ";

    $mail->send();

    echo json_encode([
        "status" => "success",
        "message" => "Your message has been sent successfully."
    ]);
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Mailer Error: " . $mail->ErrorInfo
    ]);
}