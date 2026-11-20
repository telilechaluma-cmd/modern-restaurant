import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedCategories } from '../components/home/FeaturedCategories';
import { PopularDishes } from '../components/home/PopularDishes';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { Testimonials } from '../components/home/Testimonials';
import { RestaurantInfo } from '../components/home/RestaurantInfo';

interface HomePageProps {
  navigate: (path: string) => void;
  onSelectCategory?: (categoryId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate, onSelectCategory }) => {
  const handleCategorySelect = (catId: string) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    navigate('/menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <HeroSection navigate={navigate} />
      <FeaturedCategories onSelectCategory={handleCategorySelect} />
      <PopularDishes navigate={navigate} />
      <WhyChooseUs />
      <Testimonials />
      <RestaurantInfo navigate={navigate} />
    </div>
  );
};
