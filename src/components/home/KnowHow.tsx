'use client';

import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { BsArrowRight, BsArrowDown } from 'react-icons/bs';
import { steps } from '@/lib/home';

export default function KnowHow() {
  return (
    <section className="my-5">
      <h2 className="text-center mb-4">How it works</h2>
      <Row className="align-items-center justify-content-center g-3">
        {steps.map((step, index) => {
          const Icon = step.Icon;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              <Col md>
                <Card className="h-100 text-center">
                  <Card.Body>
                    <Icon size={32} className="mb-2 text-primary" aria-hidden="true" />
                    <Card.Title as="h3">{step.title}</Card.Title>
                    <Card.Text className="text-muted">{step.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              {!isLast && (
                <Col md="auto" className="text-center text-muted">
                  <BsArrowRight size={24} className="d-none d-md-block" />
                  <BsArrowDown size={24} className="d-md-none" />
                </Col>
              )}
            </React.Fragment>
          );
        })}
      </Row>
    </section>
  );
}
