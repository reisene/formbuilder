'use client';

import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import type { IconType } from 'react-icons';
import {
  BsPencilSquare,
  BsDownload,
  BsArrowRight,
  BsArrowDown,
  BsCheck2Square,
} from 'react-icons/bs';

interface Step {
  id: number;
  title: string;
  description: string;
  Icon: IconType;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Drag & Drop',
    description: 'Add fields to your form with intuitive drag and drop.',
    Icon: BsPencilSquare,
  },
  {
    id: 2,
    title: 'Validation',
    description: 'Configure validation rules, labels, and requirements.',
    Icon: BsCheck2Square,
  },
  {
    id: 3,
    title: 'Export',
    description: 'Export ready-to-use form to HTML, React, or JSON schema.',
    Icon: BsDownload,
  },
];

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
