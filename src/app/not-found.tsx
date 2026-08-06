'use client';

import Image from 'next/image';
import { Button, Container } from 'react-bootstrap';
import Typewriter from 'typewriter-effect';

const notFound = {
  src: '/notfound.png',
  alt: 'Not Found',
  loading: 'eager' as const,
  className: 'img-fluid',
};

export default function NotFound() {
  return (
    <Container className="py-5">
      <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4">
        <div className="text-center text-lg-start flex-grow-1">
          <h2 className="display-4 font-monospace">
            <Typewriter
              options={{
                strings: ['Not Found...', 'The page does not exist.'],
                autoStart: true,
                loop: true,
                delay: 100,
                deleteSpeed: 50,
              }}
            />
          </h2>

          {/* mobile-only image: shown between h2 and paragraph */}
          <div className="d-block d-lg-none my-3">
            <Image {...notFound} width={320} height={320} />
          </div>

          <p className="lead text-muted mb-4">
            This page could not be found — return home or check the URL and try again.
          </p>
          <Button href="/" variant="outline-info">
            Go back home
          </Button>
        </div>

        {/* desktop-only image: shown on the right */}
        <div className="text-center text-lg-end d-none d-lg-block">
          <Image {...notFound} width={400} height={400} />
        </div>
      </div>
    </Container>
  );
}
