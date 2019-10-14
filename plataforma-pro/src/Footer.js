import React from "react"
import BottomNav from "./components/BottomNav"

export default function Footer (props) {
    return (
        <footer className="App-footer">
           <BottomNav page={props.page} setPage={props.setPage}/>
        </footer>
    )
}