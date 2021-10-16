import Accounts from "./Account";
import { randomAsHex } from '@polkadot/util-crypto';


const value = 0;
const gasLimit = -1;

const listTemplates = async (maincontract,AccountId) => {

    if (maincontract === null || !maincontract || !maincontract.query || !AccountId) return;

    let data = await maincontract.query.listTemplates(AccountId, {value, gasLimit});

    let str;
    if (data && data.output) {
        str = data.output.toHuman();
    }
    return str;

};
const instanceByTemplate = async (maincontract,AccountId,id,cb) => {


    if (maincontract === null || !maincontract || !AccountId) return;
    const injector = await Accounts.accountInjector(AccountId);
    const version = randomAsHex();

    let data =  await maincontract.tx.instanceByTemplate({value, gasLimit:280000n * 1000000n}, id, AccountId,version)
        .signAndSend(AccountId, { signer: injector.signer }, (result) => {
            if (result.status.isFinalized || result.status.isInBlock) {
                console.log('main.instanceByTemplate finalized', result);
                cb(true)
            }
        });

    return data;

};

export default {
    listTemplates,
    instanceByTemplate

}

