<?php
/**
 * Form handler: estimate request.
 * Validates POST and redirects back with success or error.
 */
require __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header('Location: ' . base_url('/free-estimate'));
  exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$service = trim($_POST['service'] ?? '');

$errors = [];
if (strlen($name) < 2) $errors[] = 'Name must be at least 2 characters';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Invalid email address';
if (strlen(preg_replace('/\D/', '', $phone)) < 10) $errors[] = 'Please enter a valid phone number';

if (!empty($errors)) {
  session_start();
  $_SESSION['estimate_errors'] = $errors;
  $_SESSION['estimate_old'] = ['name' => $name, 'email' => $email, 'phone' => $phone, 'service' => $service];
  header('Location: ' . base_url('/free-estimate'));
  exit;
}

// Optional: save to file or send email
$logFile = __DIR__ . '/../data/estimates.txt';
$dataDir = dirname($logFile);
if (!is_dir($dataDir)) {
  @mkdir($dataDir, 0755, true);
}
if (is_writable($dataDir)) {
  $line = date('Y-m-d H:i:s') . "\t" . $name . "\t" . $email . "\t" . $phone . "\t" . $service . "\n";
  @file_put_contents($logFile, $line, FILE_APPEND | LOCK_EX);
}

// Optional: send email to you
// mail(EMAIL, 'New Estimate Request from ' . $name, "Name: $name\nEmail: $email\nPhone: $phone\nService: $service");

header('Location: ' . base_url('/free-estimate?sent=1'));
exit;
