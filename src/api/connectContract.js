import { ContractPromise } from '@polkadot/api-contract';

// 3.0
import mainAbi from '../abi/main_v0.1';


const ConnectContract = async (api,type,address) =>{
    if(!api){
      return
    }
    let abi;
    // switch(type){
    //
    //     case'base':
    //         abi = baseAbi;
    //         break;
    //     case'erc20':
    //         abi = erc20Abi;
    //         break;
    //     case'org':
    //         abi = orgAbi;
    //         break;
    //     case'vault':
    //         abi = vaultAbi;
    //         break;
    //     case'vote':
    //         abi = voteAbi;
    //         break;
    //     case'daoManager':
    //         abi = daoManagerAbi;
    //         break;
    //     case'auth':
    //         abi = authAbi;
    //         break;
    //     default:
    //     case'main':
    //         abi = mainAbi;
    //         break;
    //
    // }

    abi = mainAbi;
    const mainContract = new ContractPromise(api, abi, address);
    return mainContract;
  }

export default ConnectContract
