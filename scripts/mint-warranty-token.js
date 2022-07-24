require('dotenv').config();
const ethers = require('ethers');


const API_KEY = process.env.API_KEY;

// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider('goerli', API_KEY)

// Get contract ABI file
const contract = require("../artifacts/contracts/Warranty.sol/MyNFT.json");

// Create a signer
const privateKey = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi
const contractAddress = process.env.CONTRACT_ADDRESS;

// Create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer)

// Get the NFT Metadata IPFS URL
const tokenUri = "https://gateway.pinata.cloud/ipfs/QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP"

// Call mintNFT function
const mintNFT = async () => {
    let nftTxn = await myNftContract.mintNFT("0xDE4A952a256F730Fa518a3d1507F8624a2DcB0C6", tokenUri)
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`)
}

const burnNFT = async () => {
    let nftTxn = await myNftContract.burnNFT(2);
    await nftTxn.wait();
    console.log('NFT has been burned successfully');
}

burnNFT()
.then(() => process.exit(0))
.catch((error) => {
    console.log(error);
    process.exit(1);
});

// mintNFT()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
// });

