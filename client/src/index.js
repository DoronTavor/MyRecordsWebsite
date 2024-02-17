import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import Modal from "react-modal";
import {
    createBrowserRouter,
        RouterProvider,
} from "react-router-dom";
import DetailsForItem from "./pages/DetailsForItem";
import Login from "./pages/Login";
import AllCds from "./pages/AllCds";
import AllVinyls from "./pages/AllVinyls";
import AddingVinyl from "./pages/AddingVinyl";
import {AboutScreen} from "./pages/AboutScreen";
import DeveloperPage from "./pages/DeveloperPage";
import AddingCD from "./pages/AddingCD";
import AddingUser from "./pages/AddingUser";
import AddingVinylByID from "./pages/AddingVinylByID";
import AddingCDByID from "./pages/AddingCDByID";
import ByArtist from "./pages/ByArtist";
import ByYear from "./pages/ByYear";
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
    },
    {
        path:"/AddVinyl",
        element:<AddingVinyl/>
    },
    {
        path:"/AddVinylById",
        element:<AddingVinylByID/>
    },
    {
        path:"/AddCDById",
        element:<AddingCDByID/>
    },
    {
        path:"/AddCD",
        element:<AddingCD/>
    },
    {
        path:"/AboutScreen",
        element:<AboutScreen/>
    },
    {
        path:"/DeveloperPage/:email",
        element:<DeveloperPage/>
    },
    {
        path:"/AddingUser",
        element:<AddingUser/>
    },
    {
        path:"/ByArtist/:artist",
        element:<ByArtist/>
    },
    {
        path:"/ByYear/:year",
        element:<ByYear/>
    }

]);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<RouterProvider router={router}/>);