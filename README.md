# IP-NFT fractionalization for ETHBerlin³

## Description

We are building a module which allows us to fractionalize ownership of [IP-NFTs](https://github.com/IP-NFT?view_as=public).

The IP-NFT is a new funding tool that empowers biomedical researchers to raise funds for their research. The minting of an IP-NFT frees up researchers time and replaces the lengthy writing of grant proposals. It allows researchers to focus on what they are passionate about - **doing science**. IP-NFTs (Intellectual Property NFTs) store royalty and commercialisation rights of science projects and act as a vehicle for investors to deploy capital in early stage research. IP-NFTs will benefit society through increased research and development (R&D) efficiency and output as well as transparent, democratic funding mechanisms.

IP-NFTs have been applied successfully in the field through research DAOs like [VitaDAO](https://www.vitadao.com/). 

## Todos

- [ ] Create basic frontend (nextjs, rainbowkit & wagmi, shakra UI)
- [ ] Proper create function where you can pass the tokenURI
- [ ] Deploy the ERC20 token factory directly in the constructor of our ERC1155 contract
- [ ] Create Deploy script
- [ ] Snapshot & Zodiac module research
- [ ] Burn fractions and go back to totalSupply of 1 again by majority vote of FAM hodlers?
- [ ] Require FAM holders to lock their FAM tokens in order to claim their share of the emitted FRENS?
- [ ] Add Solidity linting

## Challenges

- How to explain the need for the additional emission of FRENS in the scope of this hackathon? Why not stop at FAM? 
- Legal framework (FAM & FRENS) might be hard to explain

## Links

- Our SAFE multisig on Goerli: https://gnosis-safe.io/app/gor:0xf9Fa16F0c4741f6769f9d59e4F1DA9b566667889/home

## Other notes

- so und so viele fractions erstellen und rausgeben
- governance
- shakra ui, wallet connect, rainbow kit
