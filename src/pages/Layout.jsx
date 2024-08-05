import { Outlet } from "react-router";
import style from "./Layout.module.css";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";

export default function Layout() {
    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Outlet />
            </Box>
        </Box>
    )
}
