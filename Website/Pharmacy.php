<?php
// Database connection
$servername = "localhost"; // Change if your database server is different
$username = "root"; // Your database username
$password = ""; // Your database password
$dbname = "pharmacy"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm-password'];

    // Validate input
    if ($password !== $confirm_password) {
        echo "Passwords do not match.";
    } else {
        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $hashed_password);

        // Execute the statement
        if ($stmt->execute()) {
            echo "Registration successful!";
        } else {
            echo "Error: " . $stmt->error;
        }

        // Close the statement
        $stmt->close();
    }
}session_start();

// Initialize arrays to store data
if (!isset($_SESSION['medications'])) {
    $_SESSION['medications'] = [];
}
if (!isset($_SESSION['customers'])) {
    $_SESSION['customers'] = [];
}
if (!isset($_SESSION['prescriptions'])) {
    $_SESSION['prescriptions'] = [];
}

// Handle medication form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['medication-name'])) {
    $medicationName = htmlspecialchars($_POST['medication-name']);
    $medicationQuantity = intval($_POST['medication-quantity']);
    $medicationPrice = floatval($_POST['medication-price']);
    
    // Add medication to session
    $_SESSION['medications'][] = [
        'name' => $medicationName,
        'quantity' => $medicationQuantity,
        'price' => $medicationPrice
    ];
}

// Handle customer form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['customer-name'])) {
    $customerName = htmlspecialchars($_POST['customer-name']);
    $customerPhone = htmlspecialchars($_POST['customer-phone']);
    
    // Add customer to session
    $_SESSION['customers'][] = [
        'name' => $customerName,
        'phone' => $customerPhone
    ];
}

// Handle prescription form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['prescription-customer'])) {
    $prescriptionCustomer = htmlspecialchars($_POST['prescription-customer']);
    $prescriptionMedication = htmlspecialchars($_POST['prescription-medication']);
    $prescriptionQuantity = intval($_POST['prescription-quantity']);
    
    // Add prescription to session
    $_SESSION['prescriptions'][] = [
        'customer' => $prescriptionCustomer,
        'medication' => $prescriptionMedication,
        'quantity' => $prescriptionQuantity
    ];
}

// Redirect back to the main page
header('Location: index.html');
exit();

// Close the connection
$conn->close();
?>