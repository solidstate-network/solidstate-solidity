module.exports = async function (signer, { values, types, nonce, address }) {
  const hash = ethers.utils.solidityKeccak256(
    [...types, 'uint256', 'address'],
    [...values, nonce, address]
  );

  const signature = await signer.signMessage(ethers.utils.arrayify(hash));
  return ethers.utils.arrayify(signature);
};
