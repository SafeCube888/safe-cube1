import { redirect } from 'next/navigation';

export default async function StoreProductPage({ params }: { params: { slug: string } }) {
  redirect('/store');
}
