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
        address patientAddress,
        bool isUser
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
            patientAddress,
            true
        );
    }
}
