import type { RequestHandler } from '@builder.io/qwik-city';
import { getRetreats } from '~/lib/turso';

export const onGet: RequestHandler = async ({ json }) => {
  try {
    const retreats = await getRetreats();
    const formattedRetreats = retreats
      .map(retreat => ({
        id: retreat.id?.toString() || '',
        title: retreat.title?.toString() || '',
        subtitle: retreat.subtitle?.toString() || '',
        description: retreat.description?.toString() || '',
        location: retreat.location?.toString() || '',
        date: retreat.date?.toString() || '',
        dateLabel: retreat.dateLabel?.toString() || '',
        image: retreat.image?.toString() || '',
        url: retreat.url?.toString() || '',
        isActive: retreat.isActive === 1,
      }))
      .filter(retreat => retreat.isActive);

    json(200, formattedRetreats);
  } catch (error) {
    console.error('Error fetching retreats:', error);
    json(200, []);
  }
};
