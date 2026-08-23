import EditorPageClient from './EditorPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editor',
};

export default function EditorPage() {
  return <EditorPageClient />;
}
