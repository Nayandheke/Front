import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "../components/Layout"
import * as Pages from "../pages"
import { PrivateRoutes } from "./PrivateRoutes"

export const FrontRoutes = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Pages.Home />}/>
                <Route path="category/:id" element={<Pages.Category />} />
                <Route path="brand/:id" element={<Pages.Brand />} />
                <Route path="product/:id" element={<Pages.Product />} />
                <Route path="register" element={<Pages.Register />} />
                <Route path="login" element={<Pages.Login />} />
                <Route path="cart" element={<Pages.Cart />} />
                <Route path="search" element={<Pages.Search />} />
                <Route path="profile" element={<PrivateRoutes element={<Pages.Profile />} />} />
            </Route>
        </Routes>
    </BrowserRouter>
}