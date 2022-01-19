import React from "react";

function Help() {
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", margin: "20px" }}>
            <h2 style={{ margin: "10px" }}>Features of the TECHNOBOT!</h2>
            <table>
                <tr >
                    <th className="tableheading">Sr No.</th>
                    <th className="tableheading">COMMAND</th>
                    <th className="tableheading">SYNTAX</th>
                    <th className="tableheading">FUNCTION</th>
                </tr>
                <tbody>
                    <tr>
                        <td>1)</td>
                        <td >.weather</td>
                        <td>.weather (City Name)</td>
                        <td>Gives the live weather of the city specified</td>
                    </tr>
                    <tr>
                        <td>2)</td>
                        <td >.wikipedia</td>
                        <td>.wikipedia (Object Name)</td>
                        <td>Gives the wikipedia info of the object specified</td>
                    </tr>
                    <tr>
                        <td>3)</td>
                        <td >.time</td>
                        <td>.time (City Name)</td>
                        <td>Gives the current time,timezone,latitude and longitude of the city specified</td>
                    </tr>
                    <tr>
                        <td>4)</td>
                        <td >.currency</td>
                        <td>.currency (country1) (country2) (amount) </td>
                        <td>Gives the currency conversion from country1 to country2 for the given amount</td>
                    </tr>
                    <tr>
                        <td>5)</td>
                        <td >.lyrics</td>
                        <td>.lyrics (song Name)</td>
                        <td>Gives the lyrics of the song specified(sorry only english song allowed, we are working on hindi songs)</td>
                    </tr>
                    <tr>
                        <td>6)</td>
                        <td >.stocks</td>
                        <td>.stocks (stock Name)</td>
                        <td>Gives the current market value  of the stock specified</td>
                    </tr>
                    <tr>
                        <td>7)</td>
                        <td >.covid</td>
                        <td>.covid</td>
                        <td>Gives the live covid updates</td>
                    </tr>
                    <tr>
                        <td>8)</td>
                        <td >.reminder</td>
                        <td>.reminder hh:mm message</td>
                        <td>Gives message as reminder at time hh:mm</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default Help;