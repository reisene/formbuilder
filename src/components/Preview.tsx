import { Image } from 'react-bootstrap';

export default function Preview() {
  return (
    <>
      <h2 className="text-center mb-4">Preview</h2>
      <Image src="/preview.png" rounded fluid className="d-block mx-auto" />
    </>
  );
}
