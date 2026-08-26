'use client';

import { useState } from 'react';
import { Image, Modal } from 'react-bootstrap';

import { previewImg, type PreviewImage } from '@/lib/home';

export default function Preview() {
  const [selectedImage, setSelectedImage] = useState<PreviewImage | null>(null);

  return (
    <>
      <h2 className="text-center mb-4">Preview</h2>
      <div className="d-flex flex-column gap-3">
        {previewImg.map((img) => (
          <Image
            key={img.id}
            src={`preview${img.src}`}
            alt={img.alt}
            width={800}
            height={img.height}
            rounded
            fluid
            className="d-block mx-auto"
            style={{ cursor: 'zoom-in', height: 'auto' }}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      <Modal show={selectedImage !== null} onHide={() => setSelectedImage(null)} centered size="xl">
        <Modal.Body className="p-0 text-center bg-dark">
          {selectedImage ? (
            <Image
              src={`preview${selectedImage.src}`}
              alt={`${selectedImage.alt} enlarged`}
              fluid
              rounded
            />
          ) : null}
        </Modal.Body>
      </Modal>
    </>
  );
}
