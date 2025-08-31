import { http, HttpResponse } from 'msw';
import transcript from './transcript.json';

export const handlers = [
  http.post('/api/video/process', async ({ request }) => {
    const buffer = await request.arrayBuffer();

    if (!buffer) {
      return HttpResponse.json(
        {
          success: false,
          error: 'No video file provided',
        },
        { status: 400 }
      );
    }

    // Simulate processing time between 2 to 3 seconds
    const processingTime = 2000 + Math.random() * 1000;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(HttpResponse.json(transcript));
      }, processingTime);
    });
  }),
];
