import '@/styles/home.scss';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import KnowHow from '@/components/KnowHow';
import Preview from '@/components/Preview';
import { Container } from 'react-bootstrap';
import FinalCta from '@/components/FinalCta';

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
