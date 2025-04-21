import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig'; 
import TourCard from '../TourCard'; 
import './FavoritesPage.css'; 

interface FavoriteTour {
  id: string;
  userId: string;
  tourSlug: string;
  tourName: string;
  cityName: string;
  countryName: string;
  tourImage?: string; 
  tourRating?: string; 
  tourReview?: string; 
  tourPrice?: number; 
  tourDuration?: string; 
  timestamp?: Date; 
}

function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteTour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, 'favorites'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const favoriteTours: FavoriteTour[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as FavoriteTour));
        setFavorites(favoriteTours);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  if (!user) {
    return <div>Please log in to view your favorite tours.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="favorites-page-container">
      <h2>Your Favorite Tours</h2>
      {favorites.length === 0 ? (
        <p>No favorite tours yet.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((tour) => (
            <TourCard
              key={tour.id}
              cityName={tour.cityName}
              countryName={tour.countryName}
              tourName={tour.tourName}
              tourImage={tour.tourImage || 'default-image.jpg'} 
              tourRating={tour.tourRating || '4.5'} 
              tourReview={tour.tourReview || '0'} 
              tourPrice={tour.tourPrice || 0} 
              tourDuration={tour.tourDuration || 'N/A'} 
              slugValue={tour.tourSlug}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;