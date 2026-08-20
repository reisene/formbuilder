'use client';

import { Card, Col, Row } from 'react-bootstrap';
import type { IconType } from 'react-icons';
import { BsBoxArrowUpRight, BsBraces, BsCursorFill, BsEye, BsSliders } from 'react-icons/bs';

const feat: { title: string; text: string; Icon: IconType }[] = [
  {
    title: 'Drag & Drop',
    text: 'Build forms without code. Just select what you need and drop it where you want.',
    Icon: BsCursorFill,
  },
  {
    title: 'Export everywhere',
    text: 'Export your form to HTML, React component or JSON schema - build once, use anywhere.',
    Icon: BsBoxArrowUpRight,
  },
  {
    title: 'Form as schema',
    text: 'Your form is data. Store, version and share the JSON schema, then recreate it anywhere.',
    Icon: BsBraces,
  },
  {
    title: 'Live preview',
    text: 'See exactly how your form looks as you build it, before you export a single line of code.',
    Icon: BsEye,
  },
  {
    title: 'Custom fields',
    text: 'Create your own reusable field types and use them across every form you build.',
    Icon: BsSliders,
  },
];

export default function Features() {
  return (
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
  );
}
