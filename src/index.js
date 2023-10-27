import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import Modal from "react-modal";
import {
    createBrowserRouter,
        RouterProvider,
        Route,
} from "react-router-dom";
import DetailsForItem from "./pages/DetailsForItem";
import Login from "./pages/Login";
import AllCds from "./pages/AllCds";
import AllVinyls from "./pages/AllVinyls";
Modal.setAppElement("#root");
const router= createBrowserRouter([{
    path:"/",
    element:<App/>
},
    {
        path:"/Details/:id",
        element:<DetailsForItem/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/allCds",
        element:<AllCds/>
    },
    {
        path:"/allVinyls",
        element:<AllVinyls/>
    }
]);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<RouterProvider router={router}/>);