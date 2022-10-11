/* eslint-disable */
import { useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player';
import { Button } from '@mui/material';
import io from 'socket.io-client';

import HeadNav from "../components/headnav/HeadNav";
import './ContentPanel.style.css';

const SOCKET_SERVER_URL = 'http://localhost:9000'

const ContentPanel = () => {
    let {id} = useParams();
    console.log('>>>', id);

    const socketRef = useRef();
    const remoteVideoRef = useRef(null);
    const peerConnectionsRef = useRef([]);

    const config = {
        iceServers: [
            { 
                "urls": "stun:stun.l.google.com:19302",
            }
        ]
    };

    const topic = { 
        id: 1,
        title: '스쿼트',
        body: '영상 길이: 8분 \n난이도: 중',
        address: 'https://img.youtube.com/vi/dHpN_Wv53Hw/sddefault.jpg',
        url: 'https://www.youtube.com/watch?v=dHpN_Wv53Hw'
    };

    const getLocalMedia = () => {
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
        }).then(gotStream).catch(function(e) {
            alert('getUserMedia() error ' + e.name);
        });
    };

    const gotStream = (stream) => {
        console.log('local stream');
        remoteVideoRef.current.srcObject = stream;
        socketRef.current.emit("broadcaster"); // set the broadcaster
    }

    useEffect(() => {
        socketRef.current = io.connect(SOCKET_SERVER_URL, { transports: ["websocket"] });

        getLocalMedia();

        socketRef.current.on("watcher", id => {
            console.log("a");
            const peerConnection = new RTCPeerConnection(config);
            peerConnectionsRef.current[id] = peerConnection;
          
            let stream = remoteVideoRef.current.srcObject;
            stream.getTracks().forEach(track => peerConnection.addTrack(track, stream)); // add each track of the stream to peerConnection
            
            console.log("b");
            peerConnection.onicecandidate = event => {
                console.log("c");          
                if (event.candidate) {
                    socketRef.current.emit("candidate", id, event.candidate);
                }
                console.log("d");
            };
          
            peerConnection
                .createOffer()
                .then(sdp => peerConnection.setLocalDescription(sdp))
                .then(() => {
                    socketRef.current.emit("offer", id, peerConnection.localDescription);
                    console.log("e");
                });
        });
        
        socketRef.current.on("answer", (id, description) => {
            peerConnectionsRef.current[id].setRemoteDescription(description);
            console.log("f");
        });
          
        socketRef.current.on("candidate", (id, candidate) => {
            peerConnectionsRef.current[id].addIceCandidate(new RTCIceCandidate(candidate));
            console.log("g");
        });
          
        socketRef.current.on("disconnectPeer", id => {
            peerConnectionsRef.current[id].close();
            delete peerConnectionsRef.current[id];
            console.log("h");
        });

    }, []);

    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/', {replace: true}), [navigate]);

    return (
        <>
        <HeadNav></HeadNav>
        <div className="content-main">
            <div className="content-main-left">
                {/* <div className='training-video'></div>  */}
                <ReactPlayer url={topic.url} playing={true} width='100%'/>
            </div>
            <div className="content-main-right">
                <video
                    style={{
                        width: 480,
                        height: 360,
                        margin: 'auto',
                    }}
                    id='remotevideo'
                    ref={ remoteVideoRef }
                    autoPlay>
                </video>
            </div>
            <div className="content-bottom-section">
                <Button 
                    variant="contained"
                    style={{
                        "backgroundColor" : "#C70851",
                    }} 
                    onClick={handleOnClick}
                >Back to list</Button>
            </div>    
        </div>
        </>
    );
};

export default ContentPanel;