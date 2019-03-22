import Container from '../container';
import Button from '../button';
import SectionHeader from '../section-header';
import ShowcasePreview from './showcase-preview';

export default function Customers() {
  return (
    <Container gray wide center padding role="region" aria-labelledby="customers">
      <SectionHeader
        anchor="showcases"
        id="customers"
        title="Who’s Using Next.js"
        description="We’re honored some of the most talented creatives out there build with Next.js"
      />
      <ShowcasePreview />
      <div>
        <style jsx>{`
          div {
            z-index: 3;
            position: relative;
            margin-top: 2rem;
          }
        `}</style>
        <Button href="/showcase" invert>
          View Gallery
        </Button>
      </div>
    </Container>
  );
}
