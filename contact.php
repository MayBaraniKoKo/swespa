<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 1. Configuration
    $to = "maybaranikoko30@gmail.com"; // Your receiving email
    $subject = "New message from website contact form";

    // 2. Sanitize & validate input
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $message = trim($_POST["message"]);

    if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($message)) {
        // Invalid input
        http_response_code(400);
        echo "ERROR";
        exit;
    }

    // 3. Email content
    $email_content = "You have received a new message from your website contact form:\n\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n\n";
    $email_content .= "Message:\n$message\n";

    // 4. Proper headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // 5. Attempt to send
    if (mail($to, $subject, $email_content, $headers)) {
        echo "OK";
    } else {
        http_response_code(500);
        echo "ERROR";
    }
}
?>
