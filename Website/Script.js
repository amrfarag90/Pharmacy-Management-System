// Function to add medication
document.getElementById('medication-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const medicationName = document.getElementById('medication-name').value;
    const medicationQuantity = document.getElementById('medication-quantity').value;
    const medicationPrice = document.getElementById('medication-price').value;

    const medicationList = document.getElementById('medication-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${medicationName} - Quantity: ${medicationQuantity}, Price: $${medicationPrice}`;
    medicationList.appendChild(listItem);

    // Clear the form
    document.getElementById('medication-form').reset();
});

// Function to add customer
document.getElementById('customer-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const customerName = document.getElementById('customer-name').value;
    const customerPhone = document.getElementById('customer-phone').value;

    const customerList = document.getElementById('customer-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${customerName} - Phone: ${customerPhone}`;
    customerList.appendChild(listItem);

    // Clear the form
    document.getElementById('customer-form').reset();
});

// Function to add prescription
document.getElementById('prescription-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const prescriptionCustomer = document.getElementById('prescription-customer').value;
    const prescriptionMedication = document.getElementById('prescription-medication').value;
    const prescriptionQuantity = document.getElementById('prescription-quantity').value;

    const prescriptionList = document.getElementById('prescription-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${prescriptionCustomer} - Medication: ${prescriptionMedication}, Quantity: ${prescriptionQuantity}`;
    prescriptionList.appendChild(listItem);

    // Clear the form
    document.getElementById('prescription-form').reset();
});

// Function to show types of medicines (placeholder functionality)
document.getElementById('show-types-button').addEventListener('click', function() {
    alert('Types of Medicines: Painkillers, Antibiotics, Antidepressants, etc.');
});

// Chatbot functionality
document.getElementById('send-button').addEventListener('click', function() {
    const input = document.getElementById('chat-input').value;
    const chatLog = document.getElementById('chat-log');

    chatLog.innerHTML += `<div>User: ${input}</div>`;

    let response = '';
    const symptomsToMedicines = {
        'pain': 'Analgesics (e.g., ibuprofen, acetaminophen)',
        'fever': 'Antipyretics (e.g., acetaminophen, ibuprofen)',
        'cough': 'Cough suppressants (e.g., dextromethorphan), Expectorants (e.g., guaifenesin)',
        'allergy': 'Antihistamines (e.g., diphenhydramine, loratadine)',
        'infection': 'Antibiotics (e.g., amoxicillin, ciprofloxacin)',
        'depression': 'Antidepressants (e.g., fluoxetine, sertraline)',
    };

    const symptoms = Object.keys(symptomsToMedicines);
    const foundSymptoms = symptoms.filter(symptom => input.toLowerCase().includes(symptom));

    if (foundSymptoms.length > 0) {
        response = 'Based on your symptoms, you may consider the following types of medicines: ' + 
            foundSymptoms.map(symptom => symptomsToMedicines[symptom]).join(', ');
    } else {
        response = 'I am sorry, I do not have information on that. Please describe your symptoms.';
    }

    // Display chatbot response
    chatLog.innerHTML += `<div>Chatbot: ${response}</div>`;
    document.getElementById('chat-input').value = ''; 
});

// Function to print receipt
document.getElementById('print-receipt-button').addEventListener('click', function() {
    window.print();
});
