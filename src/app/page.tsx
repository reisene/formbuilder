import '@/styles/home.scss';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import KnowHow from '@/components/home/KnowHow';
import Preview from '@/components/home/Preview';
import { Container } from 'react-bootstrap';
import FinalCta from '@/components/home/FinalCta';

export default function Home() {
  return (
    <Container className="my-3">
      <Hero>
        <h1>Visual Form Builder</h1>
      </Hero>
      <Features />
      <KnowHow />
      <Preview />
      <FinalCta />
    </Container>
  );
}
