import PageBanner from "../Shared/PageBanner";
import { ProjectImages } from "../../assets/ProjectImages";

function DestinationPage(){
return(
<>
<PageBanner  
        headingText="Destination"
        normalText="Home /"
        coloredText="Destination"
        bannerImage = {ProjectImages.DESTINATION_BANNER}
/>
</>
)
}
export default DestinationPage;