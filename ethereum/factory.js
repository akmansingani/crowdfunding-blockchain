import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance =  new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x49FB5e634944e258C2728e7ceF65a55d51139b49'
);

//Attempting to deploy from account 0xcF01971DB0CAB2CBeE4A8C21BB7638aC1FA1c38c
//Contract deployed to 0x49FB5e634944e258C2728e7ceF65a55d51139b49

export default instance;