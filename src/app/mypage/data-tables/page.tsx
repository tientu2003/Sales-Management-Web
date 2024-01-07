'use client'
import { redirect } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function DataTables({}) {
    const query = useSearchParams();
  redirect('/mypage/data-tables/product?'+query);
}
