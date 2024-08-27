const { decryptNodeResponse, encryptDataField } = require("@swisstronik/utils");
const { network } = require("hardhat");
//import { BaseContract, Provider } from "ethers";

const NODE_RPC_URL = (network.config).url;

/*export*/ const sendShieldedTransaction = async (
  signer,
  destination,
  data,
  value
) => {
  // Encrypt transaction data
  const [encryptedData] = await encryptDataField(NODE_RPC_URL, data);

  // Construct and sign transaction with encrypted data
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
    gasLimit: 2000000,
    // gasPrice: 0 // We're using 0 gas price in tests. Comment it, if you're running tests on actual network
  });
};

/*export*/ const sendShieldedQuery = async (
  provider,
  destination,
  data,
  value
) => {
  // Encrypt call data
  const [encryptedData, usedEncryptedKey] = await encryptDataField(
    NODE_RPC_URL,
    data
  );

  // Do call
  const response = await provider.call({
    to,
    data,
    value,
  });

  if (response.startsWith("0x08c379a0")) {
    return response;
  }

  // Decrypt call result
  return await decryptNodeResponse(NODE_RPC_URL, response, usedEncryptedKey);
};

/*export*/ const readContractData = async (
  provider,
  contract,
  method,
  args = []
) => {
  const res = await sendShieldedQuery(
    provider,
    contract.target,
    contract.interface.encodeFunctionData(method, args),
    "0"
  );

  return contract.interface.decodeFunctionResult(method, res);
};

module.exports = { sendShieldedTransaction, sendShieldedQuery, readContractData };