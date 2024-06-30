import { ethers } from "hardhat";
import saveFrontendFiles from "../utils/saveFrontendFiles"

const VALIDATOR_ADDRESS: string = process.env.VALIDATOR_ADDRESS!;
const TOKEN_sETH_ADDRESS: string = process.env.TOKEN_sETH_ADDRESS!;
const chainID_ETH = 5;

async function main() {
    const Bridge = await ethers.getContractFactory("Bridge");
    const bridge = await Bridge.deploy(VALIDATOR_ADDRESS, TOKEN_sETH_ADDRESS, chainID_ETH);
    await bridge.deployed();
    console.log("bridge Ethereum deployed to:", bridge.address, 'with validator', VALIDATOR_ADDRESS, 'and TOKEN_sETH', TOKEN_sETH_ADDRESS);
    saveFrontendFiles('BRIDGE_ETH_Address', bridge.address);
    console.log(`\n run:`)
    console.log(`\n npx hardhat grantRole --bridge ${bridge.address} --token ${TOKEN_sETH_ADDRESS} --network goerli`)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
