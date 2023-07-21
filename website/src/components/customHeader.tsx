import {JSX} from "react";

export default function CustomHeader({children}: { children: JSX.Element }) {
    return (<div style={{
        marginTop: "60px",
        color: "black",
    }}>
        <div style={{
            marginRight: "120px",
            marginLeft: "120px"
        }}>
            {children}
        </div>

    </div>)
}