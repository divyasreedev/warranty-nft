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

// Get the NFT Metadata IPFS URL
const tokenUri = {
  productId: "123",
  walletAddress: "678",
  warrantyDetails: "hello world",
  issueDate: "23-45-2001",
  expirationDate: "06-09-2001",
};

// Call mintNFT function
const mintNFT = async () => {
  let nftTxn = await myNftContract.mintNFT(
    "0xDE4A952a256F730Fa518a3d1507F8624a2DcB0C6",
    tokenUri
  );
  await nftTxn.wait();
  return myNftContract.tokenIds;
};
// mintNFT();
module.exports = mintNFT;
