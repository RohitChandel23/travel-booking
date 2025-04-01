import { useDispatch } from "react-redux";
import { updateAuthTokenRedux } from "../../../Store/Common";

function Logout(){
const dispatch = useDispatch();

function handleLogout(){
    dispatch(updateAuthTokenRedux({token:null}))
}
    return(
    <button onClick = {handleLogout}>Logout</button>
)
}
export default Logout;