"use client"

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/app/context/socketProvider";
import { karma } from "../fonts";

export default function Lobby() {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
    const router = useRouter();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      router.push(`videoCall/room/${room}`);
    },
    [router]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="text-white flex h-screen items-center justify-center flex-col gap-4  -translate-y-10">
      <h1 className={`text-4xl ${karma.className}`}>Lobby</h1>
      <form onSubmit={handleSubmitForm} className="flex flex-col gap-2 w-[300px] mt-40">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Id"
          className="text-white bg-black border-b p-2 focus:outline-none"
        />
        <br />
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="room"
          className="text-white bg-black border-b p-2 focus:outline-none"
        />
        <br />
        <button className="p-2 border rounded-xl hover:bg-slate-200 hover:text-black">Join</button>
      </form>
    </div>
  );
};
