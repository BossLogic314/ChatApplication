import React from 'react';
import ReactDOM from 'react-dom/client';
import Commons from "../Commons";
import { Client } from '@stomp/stompjs';
import '../Styles/direct-video-call.css';

export default class DirectVideoCall extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
        }

        this.stompClient = null;

        this.startConnection = null;
        this.acceptConnection = null;
        this.dataChannel = null;
        this.localStream = null;
        this.remoteStream = new MediaStream();

        this.offerIceCandidate = null;
        this.answerIceCandidate = null;

        this.getAudioAndVideo = this.getAudioAndVideo.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.sendIceCandidate = this.sendIceCandidate.bind(this);
        this.establishWebRTCPeerConnection = this.establishWebRTCPeerConnection.bind(this);
        this.acceptWebRTCPeerConnectionRemote = this.acceptWebRTCPeerConnectionRemote.bind(this);
        this.registerAndSubscribe = this.registerAndSubscribe.bind(this);
    }

    async getAudioAndVideo() {
        // Current user's video
        this.localStream = await navigator.mediaDevices.getUserMedia({video:false, audio:true});
        document.getElementById('user-1').srcObject = this.localStream;

        // Participant's video
        document.getElementById('user-2').srcObject = this.remoteStream;

        this.establishWebRTCPeerConnection();
    }

    handleMessage(message) {
        const fromUser = message.headers.fromUser;
        const type = message.headers.type;
        const sdp = JSON.stringify(message.headers.sdp);
        const iceCandidateStr = `{"type":"${type}","sdp":${sdp}}`;
        const iceCandidateObj = JSON.parse(iceCandidateStr);

        // Got a WebRTC connection offer
        if (type == 'offer') {
            console.log(`Got offer from ${fromUser}`);
            this.acceptWebRTCPeerConnectionRemote(iceCandidateObj);
        }
        // Got a WebRTC connection answer
        else {
            console.log(`Got answer from ${fromUser}`);
            this.startConnection.setRemoteDescription(iceCandidateObj);
        }
    }

    sendIceCandidate(iceCandidateStr) {
        const iceCandidateObj = JSON.parse(iceCandidateStr);
        const type = iceCandidateObj.type;
        const sdp = iceCandidateObj.sdp;

        if (type == 'offer') {
            if (this.offerIceCandidate != null) {
                return;
            }
            this.offerIceCandidate = iceCandidateStr;
        }
        else {
            if (this.answerIceCandidate != null) {
                return;
            }
            this.answerIceCandidate = iceCandidateStr;
        }

        this.stompClient.publish({
            destination: `/topic/direct-video-call-${this.props.currentVideoCallChat}`,
            headers: {fromUser: this.props.currentUser, type: type, sdp: sdp},
        });
    }

    establishWebRTCPeerConnection() {
        if (this.startConnection != null) {
            this.startConnection.close();
        }
        this.startConnection = new RTCPeerConnection();
        this.localStream.getTracks().forEach((track) => {
            this.startConnection.addTrack(track, this.localStream);
        });
        this.startConnection.ontrack = (event) => {
            console.log(`Got tracks from ${this.props.currentVideoCallChat}`);
            event.streams[0].getTracks().forEach((track) => {
                this.remoteStream.addTrack(track);
            });
        };
        this.dataChannel = this.startConnection.createDataChannel('channel');
        this.dataChannel.onmessage = e => console.log('Got message ' + e.data);
        this.dataChannel.onopen = e => console.log('Connection opened');
        this.startConnection.onicecandidate = e => this.sendIceCandidate(JSON.stringify(this.startConnection.localDescription));
        this.startConnection.createOffer().then(o => this.startConnection.setLocalDescription(o)).then(a => console.log('Set successfully'));
    }

    acceptWebRTCPeerConnectionRemote(iceCandidateObj) {
        if (this.acceptConnection != null) {
            this.acceptConnection.close();
        }
        this.acceptConnection = new RTCPeerConnection();
        this.localStream.getTracks().forEach((track) => {
            this.acceptConnection.addTrack(track, this.localStream);
        });
        this.acceptConnection.ontrack = (event) => {
            console.log(`In accept, Got tracks from ${this.props.currentVideoCallChat}`);
            event.streams[0].getTracks().forEach((track) => {
                this.remoteStream.addTrack(track);
            });
        };
        
        this.acceptConnection.onicecandidate = e => this.sendIceCandidate(JSON.stringify(this.acceptConnection.localDescription));
        this.acceptConnection.ondatachannel = e => {
            this.acceptConnection.dc = e.channel;
            this.acceptConnection.dc.onmessage = e => console.log('New message from client: ' + e.data);
            this.acceptConnection.dc.onopen = e => console.log('Connection opened!');
        }
        this.acceptConnection.setRemoteDescription(iceCandidateObj).then(a => console.log('Offer set!'));
        this.acceptConnection.createAnswer().then(
            a => this.acceptConnection.setLocalDescription(a)).then(a => console.log('Answer created')
        );
    }

    // Register to a STOMP endpoint and subscribe to a destination path
    registerAndSubscribe() {

        // Registering to the STOMP endpoint '/chat'
        this.stompClient = new Client({
            brokerURL: 'ws://localhost:8080/chat'
        });

        this.stompClient.onConnect = (frame) => {

            // Subscribing to get SDP from the other user
            this.stompClient.subscribe(`/topic/direct-video-call-${this.props.currentUser}`, this.handleMessage);
        };
        this.stompClient.activate();
    }

    render() {
        if (!this.props.displayVideoCallPage) {
            return <></>;
        }

        this.registerAndSubscribe();
        this.getAudioAndVideo();

        return(
            <div className='direct-video-call-overlay'>
                <video className='video-player' id='user-1' autoPlay playsInline></video>
                <video className='video-player' id='user-2' autoPlay playsInline></video>
            </div>
        );
    }
}