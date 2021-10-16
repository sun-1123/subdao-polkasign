import {
    web3Accounts,
    web3Enable,
    web3FromAddress
} from '@polkadot/extension-dapp';

const accountlist = async () => {
    const allInjected = await web3Enable('SubDAO');

    if (allInjected.length === 0) {
        console.error("!!!!! No wallet extention detected!!");
        return "No wallet extention detected!!";
    }
    const allAccounts = await web3Accounts();
    if (!allAccounts) {
        console.error("no valid accounts available!");
        return "No valid accounts available!";
    }
    return allAccounts;
}

const accountInjector = async (AccountId) => {
    return await web3FromAddress(AccountId);

}

export default {
    accountlist,
    accountInjector
}
