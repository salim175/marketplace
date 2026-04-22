import { Image } from "react-bootstrap";
import Header from "../components/Header/Header";
import SimpleSider from "../components/Siders/SimpleSider";

function Error404()
{
    return (
        <>
            <Header />
            <SimpleSider />
            <div className="container" style={{ textAlign: "center" }}>
                <Image src="http://store.picbg.net/pubpic/32/E3/c2b456c4b2d532e3.jpg" fluid />
            </div >
        </>
    )
}

export default Error404;