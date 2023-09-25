import { Outlet, useNavigation } from "react-router-dom"
import CartOverview from "../features/cart/CartOverview"
import Header from "./Header"
import Loader from "./Loader";

export default function AppLayout() {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";
    return (
        <div className="grid h-screen  grid-rows-[auto_1fr_auto] ">
            <Header></Header>
            {isLoading && <Loader></Loader>}
            <div>
                <main className=" max-w-3xl mx-auto">
                    <Outlet></Outlet>
                </main>
            </div>
            <CartOverview></CartOverview>
        </div>
    )
}
