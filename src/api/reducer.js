const reducer = (state, action) => {
    switch (action.type) {
        //api
        case 'CONNECT_INIT':
            return { ...state, apiState: 'CONNECT_INIT' };

        case 'CONNECT':
            return { ...state, api: action.payload, apiState: 'CONNECTING' };

        case 'CONNECT_SUCCESS':
            return { ...state, apiState: 'READY' };

        case 'CONNECT_ERROR':
            return { ...state, apiState: 'ERROR', apiError: action.payload };

        //main contract
        case 'LOAD_MAINCONTRACT':
            return { ...state, maincontractState: 'LOAD_MAINCONTRACT' };

        case 'SET_MAINCONTRACT':
            return { ...state, maincontract: action.payload, maincontractState: 'READY' };

        case 'MAINCONTRACT_ERROR':
            return { ...state, maincontract: null, maincontractState: 'ERROR' };

        //accounts
        case 'LOAD_ALLACCOUNTS':
            return { ...state, accountState: 'LOAD_ALLACCOUNTS', account:null};

        case 'SET_ALLACCOUNTS':
            return { ...state, account: action.payload, accountState: 'READY' };

        case 'ALLACCOUNTS_ERROR':
            return { ...state, account: null, accountState: 'ERROR' };

        default:
            throw new Error(`Unknown type: ${action.type}`);
    }
};
export default reducer
