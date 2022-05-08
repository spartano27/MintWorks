import React, { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Cursor from "../cursor";
import { actions } from "@liveblocks/redux";
import {useUpdateMyPresence,useOthers} from "@liveblocks/react";


function Room(){
    const COLORS_PRESENCE = ["255, 69, 225", "255, 64, 64", "255, 166, 3"];
    const {name} = useParams();
    const others = useOthers();
    const updateMyPresence = useUpdateMyPresence();
    const username = useSelector((state:any)=>state.username);
    const dispatch = useDispatch();
    const roomList = useSelector((state:any) => state.roomList);
    const users = () => {
       roomList.forEach((element: { name: string,users: [] }) => {
           if(element.name === name){
                console.log(element);
                return element.users;
           }
           
       });
    }
    console.log(users());
        return(
           
                    <div onPointerMove={(event) => {
                        updateMyPresence({
                          cursor: {
                            x: Math.round(event.clientX),
                            y: Math.round(event.clientY)
                          }
                        })
                      }}
                      onPointerLeave={(event) => {
                        updateMyPresence({cursor: null})
                      }}>


                        <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
                        <Form.Control
                            type="color"
                            id="exampleColorInput"
                            defaultValue="#563d7c"
                            title="Choose your color"
                        />

                        <a> mi nombre de sala es: {name}</a>
                        {
                            /*Iterate over other users and display a cursor on their presence */
                            others.map(({connectionId, presence}:any) => {
                            if (presence == null || presence.cursor == null) {
                                return null;
                            }

                            return (
                                <Cursor
                                key={`cursor-${connectionId}`}
                                color={`rgb(${
                                    COLORS_PRESENCE[connectionId % COLORS_PRESENCE.length]
                                }`}
                                x={presence.cursor.x}
                                y={presence.cursor.y}
                                />
                            )
                            })
                        }
                    </div>
        );          
          
    
}

export default Room;

