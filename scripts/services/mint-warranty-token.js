require("dotenv").config();
const ethers = require("ethers");
const API_KEY = process.env.API_KEY;

// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider("goerli", API_KEY);

// Get contract ABI file
const contract = require("../../artifacts/contracts/Warranty.sol/MyNFT.json");

// Create a signer
const privateKey = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);

// Get contract ABI and address
const abi = contract.abi;
const contractAddress = process.env.CONTRACT_ADDRESS;

// Create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer);


// Call mintNFT function
const mintNFT = async (recipient, metadataUrl) => {
  let nftTxn = await myNftContract.mintNFT(
    recipient,
    metadataUrl
  );
  await nftTxn.wait();
  console.log('NFT minted successfully.');
  return myNftContract.tokenIds;
};
// mintNFT();
module.exports = mintNFT;
