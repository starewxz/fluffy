import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { ConfigProvider } from "antd";
import Router from "./router.jsx";

createRoot(document.getElementById('root')).render(
    <ConfigProvider>
        <Router/>
    </ConfigProvider>
)
