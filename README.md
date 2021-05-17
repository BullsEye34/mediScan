# How to use
## Clone the Project
<code>git clone git@github.com:BullsEye34/mediScan.git</code>
<br>
<h2>OR</h2>
<code>git clone https://github.com/BullsEye34/mediScan.git</code>
<br>

## Install Dependencies
<code>npm i</code>
<br>

## Compile Contracts
<code>truffle compile</code>
<br>

## Deploy Contracts
<code>truffle migrate</code>
<br>

## Talk with the console
<code>truffle console</code>
<br>

<hr>

<h2>Below are things to do on Truffle Console</h2>

### Assign variable 
<code>mediScan = await MediScan.deployed()</code>
<br>

### Check Address of Deployment 
<code>mediScan.address</code>
<br>

### Create Patient
<code>creat = await mediScan.createPatient('P Vamshi', '284', 123456789, 'NA', 'NA', 'NA', '0x7797be30D100F52bBA474ce30515C66ef67157d5')</code>
<br>

### View Patient
<code>pat = await mediScan.Patients('0x7797be30D100F52bBA474ce30515C66ef67157d5')</code>
<br>

### View Patient Attributes
<code>pat.\<attr\></code>
<h6>For Example</h6>

<code>pat.name</code>
<br>
<code>pat.allergies</code>
<br>
<code>pat.patientAddress</code>
<br>
<code>pat.residenceAddress</code>
<br>