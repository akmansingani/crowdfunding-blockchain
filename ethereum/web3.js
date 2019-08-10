import Web3 from 'web3';

//const web3 = new Web3(window.web3.currentProvider);

//var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:3000'));

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined')
{
    // we are in browser and metamask is running

    web3 = new Web3(window.web3.currentProvider);

}
else
{
    // on server or not running metamask

    const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q');
    web3 = new Web3(provider);

}

export default web3;