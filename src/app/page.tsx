import Hero from '@/components/landing/hero';
import ProblemStatement from '@/components/landing/problem-statement';
import HowItWorks from '@/components/landing/how-it-works';
import Differentiators from '@/components/landing/differentiators';
import Features from '@/components/landing/features';
import BuyerSupplier from '@/components/landing/buyer-supplier';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <Differentiators />
      <HowItWorks />
      <ProblemStatement />
      <BuyerSupplier />
    </div>
  );
}
