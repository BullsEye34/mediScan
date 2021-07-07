// Use Solidity Version greater than 0.7.0 and less than 0.9.0

pragma solidity ^0.5.0;

// Create a Smart Contract called Medical
contract MediScan {
    // Create a mapping to store the data as an array of Patients using the address of each Patient as the parameter
    mapping(address => Patient) public Patients;
    // Create an event called patientCreated to notify the listeners that the patient was created
    event patientCreated(
        address creatorAddress,
        string name,
        string residenceAddress,
        string nominees,
        uint256 phno,
        string medicalIssues,
        string allergies,
        string image,
        address patientAddress,
        bool isUser
    );
    // Create an event called patientEdit to notify the listeners that the patient was Edited

    event patientEdit(
        string nominees, 
        string medicalIssues, 
        string allergies
    );

    // Create a struct called Patient to store the data of the patient
    struct Patient {
        address creatorAddress; // authority who creates the Patient
        string name; // Na,e of the patient
        string residenceAddress; // address of the patient
        string nominees; // closest person ID// also seperated by ;
        uint256 phno;
        string medicalIssues; // seperated by ;
        string allergies; //seperated by ;
        string image; // Patient's Image
        address patientAddress; // Patient's Address
        bool isUser;
    }

    // Create a function to handle the creation of the Patients
    function createPatient(
        string memory name,
        string memory residenceAddress,
        uint256 phno,
        string memory nominees,
        string memory medicalIssues,
        string memory allergies,
        string memory image,
        address patientAddress
    ) public {
        // If a user already exists then fail the transaction
        require(!Patients[patientAddress].isUser);

        // Create the patient with the authorization of the creator
        Patients[patientAddress] = Patient(
            msg.sender,
            name,
            residenceAddress,
            nominees,
            phno,
            medicalIssues,
            allergies,
            image,
            patientAddress,
            true
        );

        // Emit the event that the patient was successfully created
        emit patientCreated(
            msg.sender,
            name,
            residenceAddress,
            nominees,
            phno,
            medicalIssues,
            allergies, 
            image,
            patientAddress,
            true
        );
    }

    // Create a function to edit the patient's details if neccessary
    function editPatient(
        address patientAddress,
        string memory nominees,
        string memory medicalIssues,
        string memory allergies
    ) public {
        // User should exist
        require(!(!Patients[patientAddress].isUser));
        // Set all data
        Patients[patientAddress].nominees = nominees;
        Patients[patientAddress].medicalIssues = medicalIssues;
        Patients[patientAddress].allergies = allergies;

        // Emit that patient was Edited
        emit patientEdit(
            Patients[patientAddress].nominees,
            Patients[patientAddress].medicalIssues,
            Patients[patientAddress].allergies
        );
    }
}
