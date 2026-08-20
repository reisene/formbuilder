import { Image } from 'react-bootstrap';

export default function Preview() {
  return (
    <>
      <h2 className="text-center mb-4">Preview</h2>
      <Image
        src="https://picsum.photos/id/20/1200/800.jpg?grayscale&blur=2"
        rounded
        fluid
        className="d-block mx-auto"
      />
    </>
  );
}
