import React, { useState, useEffect } from 'react';
import Accounts from '../api/Account';
import { useSubstrate } from "../api/contracts";

import styled from 'styled-components';
import {Button,Select,Row,Col} from "antd";

const SelectWidth = styled(Select)`
  width: 200px;
`


export default function Headertop(props) {
    const { state, dispatch } = useSubstrate();
    const { account, api, maincontract } = state;

    const [selected, setselected] = useState([]);
    const [allList, setallList] = useState([]);
    const [balanceOf, setbalanceOf] = useState(0);

    const queryBalance = async (account) => {
        await api.query.system.account(account, ({ data: balance }) => {
            setbalanceOf(balance.toHuman().free)
        });
    }

    useEffect(() => {
        if(api == null) return;
        dispatch({ type: 'LOAD_MAINCONTRACT' });
    }, [api]);

    useEffect(() => {
        if (maincontract == null) return;
        queryBalance(selected)
    }, [maincontract,selected]);
    const selectAccounts = async (val) => {
        setselected(val);
        dispatch({ type: 'SET_ALLACCOUNTS', payload: val });
    }

    const exitAccount = () => {
        dispatch({ type: 'LOAD_ALLACCOUNTS' });
        setselected([])

    }

    const connectWallet = async () => {
        const accoutlist = await Accounts.accountlist();
        setallList(accoutlist);

    }
    return (
        <div className='header'>
            <div className="row">
                    <Row gutter={16}>
                        <Col className="gutter-row" span={6}>
                            <Button type="primary" onClick={connectWallet}>Connect Wallet</Button>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div>   {
                                !!allList.length &&<SelectWidth onChange={selectAccounts} value={selected}>

                                    {
                                        allList && allList.length && allList.map((opt) =><Select.Option value={opt.address} key={opt.address}>{opt.meta.name}</Select.Option>)

                                    }
                                </SelectWidth>
                            }</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            {
                                account != null && <span className='balanceRht'>{balanceOf}</span>
                            }
                        </Col>
                        <Col className="gutter-row" span={6}>
                            {!!selected.length &&
                            <span className='logout' onClick={exitAccount}>logout</span>
                            }
                        </Col>
                    </Row>
            </div>
        </div>
    );
}

