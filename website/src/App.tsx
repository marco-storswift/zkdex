import {useRoutes} from "react-router-dom";
import routes from "./routes";
import Header from "./components/Header";
import {Layout} from "antd";

const {Content} = Layout;

function App() {
    const element = useRoutes(routes);
    return (<Layout style={{minHeight: '100vh'}}>
        <Header/>
        <Content style={{position: "fixed", width: "100%", height: "100%"}}>
            {element}
        </Content>
    </Layout>)
}

export default App
