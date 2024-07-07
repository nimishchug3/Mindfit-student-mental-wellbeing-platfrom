'use client'
import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import { useSocket } from "@/app/context/socketProvider";

const RoomPage = () => {
  const [peer, setPeer] = useState(null);
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    console.log(id)
    setRemoteSocketId(id);
  }, []);


  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket, peer]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket, peer]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream, peer]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams, peer]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket, peer]);

  useEffect(() => {
    if (!peer) {
      import("@/app/service/peer").then((module) => {
        setPeer(module.default);
      });
    }
  }, [peer]);

  useEffect(() => {
    if (peer) {
      peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
      return () => {
        peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
      };
    }
  }, [peer, handleNegoNeeded]);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
  ]);

  useEffect(() => {
    if (peer) {
      peer.peer.addEventListener("track", async (ev) => {
        const remoteStream = ev.streams;
        console.log("GOT TRACKS!!");
        setRemoteStream(remoteStream[0]);
      });
    }
  }, [peer]);

  return (
<div className="text-white p-8 bg-gray-800 rounded-lg">
  <h1 className="text-3xl font-bold mb-4">Room Page</h1>
  <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
  {myStream && (
    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={sendStreams}>
      Send Stream
    </button>
  )}
  {remoteSocketId && (
    <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleCallUser}>
      CALL
    </button>
  )}
  <div className="flex flex-wrap mt-4">
    {myStream && (
      <div className="w-full md:w-1/2 md:pr-2">
        <h1 className="text-xl font-bold mb-2">your Stream</h1>
        <ReactPlayer
          playing
          muted
          className="w-full h-64"
          url={myStream}
        />
      </div>
    )}
    {remoteStream && (
      <div className="w-full md:w-1/2 md:pl-2">
        <h1 className="text-xl font-bold mb-2">Remote Stream</h1>
        <ReactPlayer
          playing
          muted
          className="w-full h-64"
          url={remoteStream}
        />
      </div>
    )}
  </div>
</div>

  );
};

export default RoomPage;
