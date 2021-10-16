import React, { useState, useEffect } from 'react';
import main from "../api/main"
import {Row,Col,Button,Spin} from "antd";
import {useSubstrate} from '../api/contracts';
import styled from "styled-components";
import Pdf from "./pdf";
import IpfsJsx from './ipfs'

// react-beautiful-dnd https://codesandbox.io/s/simple-virtual-list-board-vgvzt

const RowBg = styled(Row)`
  margin-top: 20px;
  dt{
    margin-bottom: 10px;
  }
`;

const ColBg = styled(Col)`
 border: 1px solid #ccc;
 margin-bottom: 20px;
`

const Query = styled.div`
  margin-top: 20px;
`

export default function Content(props) {
    const { state, dispatch } = useSubstrate();
    const {api, maincontract, account } = state;

    let [list, setlist] = useState([]);
    const [instanceByTemplate, setinstanceByTemplate] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if(api == null) return;
        dispatch({ type: 'LOAD_MAINCONTRACT' });
    }, [api]);

    const setlisttemplate = async () => {
        await main.listTemplates(maincontract,account).then(data => {
            if(data){
                setlist(data);
            }
        })
    };
    const stepone = async () => {
        console.log("=====instanceByTemplate")
        setShow(true)
        await main.instanceByTemplate(maincontract,account, 0,(result) => {
            setinstanceByTemplate(result);
            setShow(false )
        });
    };

    return (
        <div>
            {
                account && <Query>
                    <Button onClick={()=>setlisttemplate()}> test "query"</Button>
                    <RowBg gutter={16}>
                        {
                            !!list.length && list.map(i => (

                                <ColBg key={i.id}  id={i.id} span={6}>
                                    <dt >{i.name}</dt>
                                    {i.components.map(item=>(<dd key={item[1]}>·  {item[0]}</dd>))}
                                </ColBg>
                            ))
                        }
                    </RowBg>
                </Query>
            }
            {
                account && <Query>
                    <div>
                        <Button onClick={()=>stepone()}> test "signAndSend"</Button>
                    </div>
                    <div>
                        {
                            instanceByTemplate && <div>{JSON.stringify(instanceByTemplate)}</div>
                        }
                        {
                            show && <Spin />
                        }
                    </div>

                </Query>
            }

            {
                account &&<Pdf />
            }
            {
                account && <IpfsJsx />
            }
        </div>


    );
}

