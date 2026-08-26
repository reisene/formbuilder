'use client';

import { Card, Col, Row } from 'react-bootstrap';
import { feat } from '@/lib/home';

export default function Features() {
  return (
    <section className="my-5">
      <h2 className="text-center mb-4">Features</h2>
      <Row xs={1} md={3} className="g-4 justify-content-center">
        {feat.map((f) => {
          const Icon = f.Icon;
          return (
            <Col key={f.title}>
              <Card className="h-100 text-center">
                <Card.Body className="d-flex flex-column align-items-center gap-2">
                  <Icon size={32} aria-hidden="true" />
                  <Card.Title as="h3">{f.title}</Card.Title>
                  <Card.Text className="text-muted">{f.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </section>
  );
}
