const MediScan = artifacts.require('MediScan')

module.exports = async function(deployer, network, accounts) {
  deployer.deploy(MediScan)
}
