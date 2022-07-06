import { utils, Wallet } from "zksync-web3";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

import * as secrets from "../secrets.json";

const feeToken: string | undefined = '';

export default async function (hre: HardhatRuntimeEnvironment) {
    // Initialize deployer.
    const wallet = new Wallet(secrets.privateKey);
    const deployer = new Deployer(hre, wallet);
    console.log(`Use account ${wallet.address} as deployer.`);

    console.log(`Deploying WETH contract..`);
    const artifact = await deployer.loadArtifact('WETH9');
    const WETH = await deployer.deploy(artifact, [], feeToken ? {
        feeToken: feeToken
    } : undefined);

    await WETH.deployed();
    console.log(`WETH has been successfully deployed to ${WETH.address}.`);
}
