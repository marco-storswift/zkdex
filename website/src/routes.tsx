
import { RouteObject } from "react-router-dom";
import Home from "./pages/Home";
import Pools from "./pages/Pools";


const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
    }, {
        path: "/pools",
        element: <Pools />,
    },
]
export default routes;