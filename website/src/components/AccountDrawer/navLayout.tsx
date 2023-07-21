import {Nav} from "rsuite";
import NavPage from "./navPage";
import {useState} from "react";
import TokensListPage from "./tokensListPage";

export default function NavLayout() {
    const [eventKey, setEventKey] = useState("tokens")
    return (<div style={{paddingTop: "32px"}}>
        <Nav appearance={"subtle"} activeKey={eventKey} onSelect={(eventKey, event) => {
            setEventKey(eventKey)
        }}>
            <Nav.Item eventKey="tokens">Tokens</Nav.Item>
            {/*<Nav.Item eventKey="pools">Pools</Nav.Item>*/}
        </Nav>
        {
            eventKey === "tokens" ? <TokensListPage></TokensListPage> : <NavPage></NavPage>
        }
    </div>)
}