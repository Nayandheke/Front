import { Form } from "react-router-dom"
import { Tab, Tabs } from "react-bootstrap";
import { Orders } from "./Orders";
import { Reviews } from "./Reviews";
import { EditProfile } from "./EditProfile";
import { Password } from "./Password";


export const Profile = () => {
    return <div className="col-12">
        {/* Main Content */}
        <div className="row">
            <div className="col-12 mt-3 text-center text-uppercase">
                <h2>User Dashboard</h2>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-6 col-md-8 col-sm-10 mx-auto bg-white py-3 mb-4">
                <div className="row">
                    <div className="col-12">
                       <Tabs defaultActiveKey="orders" id="fill-tab-example" className="mb-3" fill>
                        <Tab eventKey="orders" title="Orders">
                            Orders
                            <Orders/>
                        </Tab>
                        <Tab eventKey="reviews" title="Reviews">
                            <Reviews/>
                        </Tab>
                        <Tab eventKey="profile" title="Profile">
                            <EditProfile/>
                        </Tab>
                        <Tab eventKey="password" title="Password">
                            <Password/>
                        </Tab>

                       </Tabs>
                    </div>
                </div>
            </div >
        </div>
    </div>
}