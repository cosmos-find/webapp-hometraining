/* eslint-disable */
import { useState, useEffect, useRef, useCallback } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useParams, useHistory, useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player';
import HeadNav from "../components/headnav/HeadNav";
import io from 'socket.io-client';
import './ContentPanel.style.css';
import Button from '@enact/sandstone/Button';

const SOCKET_SERVER_URL = 'http://localhost:9000'

const ContentPanel = () => {
    let {id} = useParams();
    console.log('>>>', id);

    const socketRef = useRef();
    const remoteVideoRef = useRef(null);
    let peerConnection;

    const config = {
        iceServers: [
            { 
                "urls": "stun:stun.l.google.com:19302",
            }
        ]
    };

    const topic = { 
        id: 19,
        title: '푸쉬업',
        body: '영상 길이: 3분 \n난이도: 상',
        address: 'image/pushup.png',
        url:'https://www.youtube.com/watch?v=Zq8nRY9P_cM'
    };

    useEffect(() => {
        socketRef.current = io.connect(SOCKET_SERVER_URL, { transports: ["websocket"] });

        socketRef.current.on("offer", (id, description) => {
            peerConnection = new RTCPeerConnection(config);
            peerConnection
                .setRemoteDescription(description)
                .then(() => peerConnection.createAnswer())
                .then(sdp => peerConnection.setLocalDescription(sdp))
                .then(() => {
                    socketRef.current.emit("answer", id, peerConnection.localDescription);
                });

            peerConnection.ontrack = event => {
                if(remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
            };

            peerConnection.onicecandidate = event => {
                if (event.candidate) {
                    socketRef.current.emit("candidate", id, event.candidate);
                }
            };
        });

        socketRef.current.on("candidate", (id, candidate) => {
            peerConnection
                .addIceCandidate(new RTCIceCandidate(candidate))
                .catch(e => console.error(e));
        });

        socketRef.current.on("connect", () => {
            socketRef.current.emit("watcher");
        });

        socketRef.current.on("broadcaster", () => {
            socketRef.current.emit("watcher");
        });

    }, []);

    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/', {replace: true}), [navigate]);

    return (
        <>
        <HeadNav></HeadNav>
        <div className="content-main">
            <div className="content-main-left">
                <div className='training-video'><ReactPlayer url={topic.url} playing={true} width='100%'/></div> 
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
                <Button color="red" size="small" onClick={handleOnClick}>Back</Button>
            </div>    
        </div>
        </>
    );
};

export default ContentPanel;