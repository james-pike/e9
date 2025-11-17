import type { RequestHandler } from '@builder.io/qwik-city';
import { getClasses } from '~/lib/turso';

export const onGet: RequestHandler = async ({ json }) => {
  try {
    const classes = await getClasses();
    const formattedClasses = classes
      .map(classItem => ({
        id: classItem.id?.toString() || '',
        name: classItem.name?.toString() || '',
        description: classItem.description?.toString() || '',
        image: classItem.image?.toString() || '',
        url: classItem.url?.toString() || '',
        isActive: classItem.isActive === 1,
      }))
      .filter(classItem => classItem.isActive);

    json(200, formattedClasses);
  } catch (error) {
    console.error('Error fetching classes:', error);
    json(200, []);
  }
};
