import React, { useState } from 'react'
import styled from 'styled-components'
import { getFaucet } from '../api/api'
import { Input } from 'antd';
import { TwitterOutlined } from '@ant-design/icons';
import FAUCET from '../img/FAUCET.png'

const Div = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    margin-top: 100px;
    .title{
        margin-bottom: 16px;
        font-size: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 40px;
            margin-right: 10px;
        }
    }
    /* .fa-bath{
        &:before{
            content: "\f2cd";
        }
    } */

    .row{
        width: 80%;
        margin: 0 auto;
        .tips{
            padding: 10px 0;
            height: 60px;
            .error{
                color: red;
            }
        }
    }

    .content{
        margin-top: 60px;

        h3{
            font-size: 24px;
        }
        .details,.twitterBox{
            margin-bottom: 20px;
        }
        .twitterBox{
            margin-left: 60px;
            display: flex;
            .twitter{
                font-size: 40px;
                margin-right: 20px;
            }
        }
    }
`

const { Search } = Input;

export default function MyContent() {

    const [show, setshow] = useState(null)

    const onSearch = (value) => {
        setshow(null)
        if (value) {
            getFaucet(value).then((resp) => {
                console.info(55, resp)
                if (resp === '0x01') {
                    setshow('24小时只能请求一次')
                } else if (resp === '0x02') {
                    setshow('不正确的Twitter')
                } else {
                    setshow(true)
                }
            }).catch(err => {
                setshow('Error')
                console.error(err)
            })
        }
    }

    return (
        <Div className="container">
            <h1 className="title">
                <img src={FAUCET} alt="" />
                Rinkeby Authenticated Faucet
            </h1>

            <div className="row">
                <Search
                    placeholder="twitter url"
                    allowClear
                    enterButton="Give me 100 GOV"
                    size="large"
                    onSearch={onSearch}
                />
                <div className="tips">
                    {(show && show !== true) && <span className="error">{show}</span>}
                    {show === true && <span>
                        Funding request submitted. Check your GOV balance from <a href="https://explorer.subdao.org/#/accounts" target="_blank" rel="noreferrer">https://explorer.subdao.org/#/accounts</a>
                    </span>
                    }
                </div>
            </div>

            <div className="content">
                <h3>How does this work?</h3>
                <div className="details">This Ether faucet is running on the Rinkeby network. To prevent malicious actors from exhausting all available funds or accumulating enough Ether to mount long running spam attacks, requests are tied to common 3rd party social network accounts. Anyone having a Twitter or Facebook account may request funds within the permitted limits.</div>
                <div className="twitterBox">
                    <TwitterOutlined className="twitter" />
                    <div>
                        To request funds via Twitter, make a <a href="https://twitter.com/intent/tweet?text=Requesting%20faucet%20funds%20into%200x0000000000000000000000000000000000000000%20on%20the%20%23Rinkeby%20%23Ethereum%20test%20network." target="_about:blank">tweet</a> with your Ethereum address pasted into the contents (surrounding text doesn't matter).
                        <br />
                        Copy-paste the <a href="https://support.twitter.com/articles/80586" target="_about:blank">tweets URL</a> into the above input box and fire away!
                    </div>
                </div>
                <div className="details">You can track the current pending requests below the input field to see how much you have to wait until your turn comes.</div>
                <div className="details">The faucet is running invisible reCaptcha protection against bots.</div>
            </div>
        </Div>
    )
}
