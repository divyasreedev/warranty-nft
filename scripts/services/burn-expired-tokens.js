require("dotenv").config();
const ethers = require("ethers");
const warrantySchema = require("../models/warranty");
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

const burnNFT = async (tokenId) => {
  try {
    let nftTxn = await myNftContract.burnNFT(tokenId);
    await nftTxn.wait();
    console.log(`NFT Token: ${tokenId} has been burned successfully`);
  } catch (e) {
    console.log(`Exception occurred while burning NFT Token: ${tokenId}`);
  }
};

const burnExpiredTokens = async () => {
  
  const dbResponse = await warrantySchema.find({
    expirationDate: { $lte: Date.now() },
  });

  // console.log(dbResponse);
  
  dbResponse.forEach(async entry =>  {
    await burnNFT(entry.tokenId);
  });

  const res = await warrantySchema.deleteMany({
    expirationDate: { $lte: Date.now() },
  });
};

module.exports = burnExpiredTokens;
