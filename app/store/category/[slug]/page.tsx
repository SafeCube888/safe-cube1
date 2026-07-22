import { redirect } from 'next/navigation';

export default async function StoreCategoryPage({ params }: { params: { slug: string } }) {
  redirect('/store');
}
