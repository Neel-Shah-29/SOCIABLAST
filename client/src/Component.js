import React from "react";
import UserContext from "./UserContext";
import { useContext } from "react";
import "./Components.css";
function Component(props) {
    const { messageList, setMessageList } = useContext(UserContext);

    if (typeof (props.a.message) === 'string') {
        return (
            <div style={
                {
                    backgroundColor: "rgb(255, 208, 0)",
                    color: "#212121", borderRadius: "10px",
                    padding: "7px"
                }
            }>
                {props.a.message}
            </div>
        )
    }
    else {
        if (props.a.message[0] === ".weather") {
            return (
                <div id="bot">
                    <div className="weather"
                        id={props.a.message[1] < 20 ? "cold" : "hot"}>
                        {console.log(props.a.message)}
                        <h3>City:{props.a.message[4]}</h3>
                        <h3>Temp:{props.a.message[1]}°C</h3>
                        <p>Country:{props.a.message[2]}</p>
                        <p>Max Temp:{props.a.message[5]}</p>
                        <p>Min Temp:{props.a.message[6]}</p>
                        <p>Humidity:{props.a.message[7]}</p>
                        <p>{props.a.message[3]}</p>
                    </div>
                </div>)
        }
        else if (props.a.message[0] === ".wikipedia") {
            return (
                <div className="wiki">
                    <div>
                        {console.log(props.a.message)}
                        <h3>{props.a.message[2]}</h3>
                        <p>{props.a.message[1]}</p>
                    </div>
                </div>)
        }
        else if (props.a.message[0] === ".time") {
            return (
                <div>
                    <div className="timezone">
                        <div>
                            {console.log(props.a.message)}
                            <h4 className="timezone0">City:{props.a.message[6]}</h4>
                            <h5 className="timezone1">Date and Time:{props.a.message[1]}</h5>
                            <p className="timezone1">Timezone Name:{props.a.message[2]}</p>
                            <p className="timezone1">Timezone:{props.a.message[3]}</p>
                            <p className="timezone1">Latitude:{props.a.message[4]}</p>
                            <p className="timezone1">Longitude:{props.a.message[5]}</p>
                        </div>
                    </div>
                </div>)
        }
        else if (props.a.message[0] === ".currency") {
            return (
                <div>
                    <div className="currency">
                        {console.log(props.a.message)}
                        <p>{props.a.message[1]}
                            {` `}
                            {props.a.message[2]} =
                            {` `}
                            {props.a.message[4]}
                            {` `}
                            {props.a.message[3]}
                        </p>
                    </div>
                </div>)
        }
        else if (props.a.message[0] === ".lyrics") {
            return (
                <div>
                    <div className="lyrics">
                        {console.log(props.a.message)}
                        <h3>Song : {` `}{props.a.message[2]} </h3>
                        <p style={{ whiteSpace: "pre-wrap" }}>{props.a.message[1]}</p>
                    </div>
                </div>)
        }
        else if (props.a.message[0] === ".stocks") {
            return (
                <div>
                    <div className="stocks">
                        {console.log(props.a.message)}
                        <p>Current price:{props.a.message[1]}</p>
                        <p>Day_high:{props.a.message[2]}</p>
                        <p>Day_Low:{props.a.message[3]}</p>
                    </div>
                </div>)
        }
        else if (props.a.message[0] === ".covid") {
            return (
                <div>
                    <div className="covid">
                        <p>Total Cases:{props.a.message[1]}</p>
                        <p>Total Deaths:{props.a.message[2]}</p>
                        <p>Total Recovered:{props.a.message[3]}</p>
                    </div>
                </div>);
        }
        else if (props.a.message[0] === ".reminder") {
            return (
                <div className="reminder">
                    <div>
                        {console.log(props.a.message)}
                        <p>Reminder at: </p>
                        <p>{props.a.message[2] + ':' + props.a.message[1]}</p>
                        <p>{props.a.message[3]}</p>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>Enter a valid command.</div>)
        }
    }
}
export default Component
