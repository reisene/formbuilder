'use client';

import type { ReactNode } from 'react';
import Typewriter from 'typewriter-effect';
import { Button } from 'react-bootstrap';
import { strings } from '@/lib/home';

export default function Hero({ children }: { children: ReactNode }) {
  return (
    <div className="text-center font-monospace">
      {children}
      <div className="display-6">
        <Typewriter
          options={{
            strings,
            autoStart: true,
            loop: true,
            wrapperClassName: 'Typewriter_wrapper fx-4',
          }}
        />
      </div>
      <Button href="/editor" variant="success" size="lg">
        Start building
      </Button>
      <Button href="/docs" variant="outline-success" size="lg">
        Read the docs
      </Button>
    </div>
  );
}
