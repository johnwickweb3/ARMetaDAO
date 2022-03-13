import Arweave from 'arweave';
const arweave = Arweave.init({
    host: 'testnet.redstone.tools',//testnet.redstone.tools arweave.net
    protocol: 'https',
    port: 443,
});

export var network={
    arweave:arweave,
    usersContract:"bD-R_Pz860MgfK8jfw8Ss9xQGP0Pw8XG8feb5EEWNjY",
    url:"https://testnet.redstone.tools/",
    armetaAPI:"/.netlify/functions/metadata?armeta="
}