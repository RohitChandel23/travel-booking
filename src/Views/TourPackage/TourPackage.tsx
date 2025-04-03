import './TourPackage.css';
import {CLASSNAMES} from './Shared/Constants'
import PageBanner from '../Shared/PageBanner';
import SearchArea from '../Shared/SearchArea';
import FilterByReviews from './Filter/FilterByReviews/FilterByReviews';
import TourCard from '../TourCard';
import { useGetTrendingToursQuery } from '../../Services/Api/module/demoApi';


function TourPackagePage(){

        const {data} = useGetTrendingToursQuery('');
        const attractions = data?.data?.products?.slice(0, 8) || [];

        console.log(data);    

    return(
    <>
    <PageBanner headingText="Tour Package" normalText="Tour Package /" coloredText="Tour Package" />
    <SearchArea/>

    <div className={CLASSNAMES.FILTER_DISPLAY}>
        <div className={CLASSNAMES.FILTER_CONTAINER}>

            <div className='tour-filter-types'>
                <FilterByReviews/>
            </div>
        </div>

        <div className={CLASSNAMES.TOURS_CONTAINER}>
        {attractions.map((item: any) => {
              const countryName =
                (item?.ufiDetails?.url?.country).toUpperCase();
              const cityName = item?.ufiDetails?.bCityName;
              const tourName = item?.name;
              const tourImage = item?.primaryPhoto?.small;
              const tourRating =
                item?.reviewsStats?.combinedNumericStats?.average;
              const tourReview = item?.reviewsStats?.allReviewsCount;
              const tourPrice = Math.floor(
                item?.representativePrice?.chargeAmount
              );
              const slugValue = item?.slug;

              return (
                <TourCard
                  cityName={cityName}
                  countryName={countryName}
                  tourName={tourName}
                  tourImage={tourImage}
                  tourRating={tourRating}
                  tourReview={tourReview}
                  tourPrice={tourPrice}
                  tourDuration="2 days"
                  slugValue={slugValue}
                />
              );
            })}              
        </div>

    </div>
    </>
    )
}
export default TourPackagePage;