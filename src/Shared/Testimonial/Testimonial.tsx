import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './Testimonial.css';
import { ProjectImages } from '../../assets/ProjectImages';

function Testimonial() {
  const testimonials = [
    {
      text: "The UI designs he crafted are top-notch, and the design system he integrated allows for straightforward fixes and bulk updates almost every area the app.",
      author: "Molie Rosa, Photographer",
      id:1
    },
    {
      text: "Their travel itineraries are perfectly planned, making every trip seamless and enjoyable. I've never had such a stress-free vacation!",
      author: "John Doe, Traveler",
      id:2
    },
    {
      text: "The app's features are a true game-changer for travelers. Booking and exploring destinations has never been easier or more intuitive",
      author: "Sarah Lee, Blogger",
      id:3
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextTestimonial(),
    onSwipedRight: () => prevTestimonial(),
    trackMouse: true,
  });

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="testimonial-wrapper">
      <div className="testimonial-container">
        <div className="testimonial-image-container">
          <div className="testimonial-img-one">
            <img src={ProjectImages.TESTIMONIAL_ONE} alt="Testimonial" />
          </div>
          <div className="testimonial-img-two">
            <img src={ProjectImages.TESTIMONIAL_TWO} alt="Testimonial" />
          </div>
          <div className="testimonial-img-three">
            <img src={ProjectImages.TESTIMONIAL_THREE} alt="Testimonial" />
          </div>
        </div>

        <div className="testimonial-content-container">
          <h4 className="cursive-text">Testimonials</h4>
          <h2>What Travelers Say</h2>

          <div className="testimonial-text" {...swipeHandlers}>
            <div className="quote-mark">❞</div>
            <p>{testimonials[currentIndex].text}</p>
            <div className="author">– By {testimonials[currentIndex].author}</div>
          </div>

          <div className="navigation-dots">
            {testimonials.map((item, index) => (
              
              <button
                key={item.id}
                className={`btn-dot dot ${currentIndex === index ? 'active' : ''}`}
                onClick={() => goToTestimonial(index)}
              />

            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
