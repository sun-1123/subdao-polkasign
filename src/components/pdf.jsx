import React, {useState} from "react";
import {Button, Row} from "antd";
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

import styled from 'styled-components';

const CanvasBg = styled.canvas`
  width: 100px;
  height: 150px;
  margin:20px 20px 0 0;
`

const DivBg = styled(Row)`
  margin-top: 20px;
`;

export default function PDFViewer() {
    const [totalPage, setTotalPage] = useState([]);

   const init = async () => {

        pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
        let winW = document.documentElement.clientWidth;

        let pdfUrl = 'pdf/pdf.pdf';

        let loadingTask = pdfjsLib.getDocument(pdfUrl);

        loadingTask.promise.then(
            pdf => {
                let pageNum = pdf.numPages;

                setTimeout(()=>{
                    let arr=[] ;
                    for (let i = 1; i <= pageNum; i++) {
                        arr.push(i);


                    }
                    setTotalPage(arr);

                    for (let i = 1; i <= pageNum; i++) {
                        pdf.getPage(i).then(page => {
                            let viewport = page.getViewport({scale: 1});
                            let scale = (winW / viewport.width).toFixed(2);
                            let scaledViewport = page.getViewport({scale: 1});
                            let canvas = document.getElementById('the-canvas' + i);

                            let context = canvas.getContext('2d');
                            canvas.height = scaledViewport.height;
                            canvas.width = scaledViewport.width;
                            let renderContext = {
                                canvasContext: context,
                                viewport: scaledViewport
                            };
                            let renderTask = page.render(renderContext);
                            renderTask.promise.then(() => {})
                        })
                    }
                },0)
            },
             (reason)=> {
                console.error(reason)
            }
        )
    }

    return (
        <DivBg>
            <div>
                <Button onClick={()=>init()}> test "pdfjs-dist"</Button>
            </div>
            <div>
                {
                    totalPage.map((item)=><CanvasBg key={item} id={'the-canvas' + item} className="pdf-content" />)
                }
            </div>
        </DivBg>)

}
