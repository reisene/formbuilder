import { Image } from 'react-bootstrap';

const previewImg = [
  {
    id: 1,
    src: './preview1.png',
  },
  {
    id: 2,
    src: './preview2.png',
  },
  {
    id: 3,
    src: './preview3.png',
  },
];

export default function Preview() {
  return (
    <>
      <h2 className="text-center mb-4">Preview</h2>
      <div className="d-flex flex-column gap-3">
        {previewImg.map((img) => (
          <Image
            key={img.id}
            src={`/preview${img.src.slice(1)}`}
            rounded
            fluid
            className="d-block mx-auto"
          />
        ))}
      </div>
    </>
  );
}
