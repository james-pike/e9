import type { RequestHandler } from '@builder.io/qwik-city';
import { turso } from '~/lib/turso';

export const onGet: RequestHandler = async ({ json }) => {
  try {
    const result = await turso.execute('SELECT * FROM reviews ORDER BY id ASC');
    const reviews = result.rows.map((row: any) => ({
      id: Number(row.id) || 0,
      name: String(row.name) || '',
      review: String(row.review) || '',
      rating: Number(row.rating) || 0,
      date: String(row.date) || '',
      role: String(row.role) || '',
    }));

    json(200, reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    json(200, []);
  }
};
