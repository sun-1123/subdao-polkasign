import React, { useState } from 'react';

import {Upload, Button} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import styled from "styled-components";
import { create } from "ipfs-http-client";

const Ipfsdiv = styled.div`
  margin-top: 30px;
`;
const Imgbrdr=styled.div`
  margin-top: 20px;
  img{
  width: 100px;
  }
`
export default function IpfsJsx(props) {

    const [Url,setUrl]= useState(null);

    const upload = async (e) => {

        const file = e.file;
        console.log(file)
        const ipfsC = create({
            host: "ipfs.infura.io",
            port: "5001",
            protocol: "https",
        });
        const added = await ipfsC.add(file, {
            progress: (prog) => console.log(`received: ${prog}`),
        });
        console.log(added)
        let v1CID = added.cid.toV1().toString();
        console.log(v1CID)
        setUrl(`https://${v1CID}.ipfs.dweb.link`)

    }

    return (
        <Ipfsdiv>
            <div>
                <Upload customRequest={(e) =>  upload(e) } showUploadList={false}>
                    <Button icon={<UploadOutlined />} >Click to Upload</Button>
                </Upload>
            </div>
            <Imgbrdr>
                <img src={Url} alt=""/>
            </Imgbrdr>

        </Ipfsdiv>

    )
}
