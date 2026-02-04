
import FeaturedProduct from "./ui/components/FeaturedProduct";
import Hero from "./ui/components/hero";
import ProductReviews from "./ui/components/reviewsLanding";
import SectionHeading from "./ui/components/section-heading";
import HowItsmade from "./ui/components/TheCraft";
  



export default function Home() {
  return (
  
    <div className="flex flex-col gap-7">
 <Hero />

      <HowItsmade />

      <FeaturedProduct />

      <SectionHeading />

      <ProductReviews />      
        
   
    </div>
  );
}
