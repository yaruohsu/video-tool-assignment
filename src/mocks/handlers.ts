import { http, HttpResponse, type JsonBodyType } from 'msw';
import generateVideoResponse from './generateVideoResponse';

interface VideoProcessRequest {
  duration?: number;
  videoFile?: File | null;
}

interface ErrorResponse {
  success: false;
  error: string;
}

export const handlers = [
  http.post('/api/video/process', async ({ request }) => {
    const body = (await request.json()) as VideoProcessRequest;

    if (body.duration == null || body.duration <= 0) {
      return HttpResponse.json<ErrorResponse>(
        {
          success: false,
          error: 'No video file provided',
        },
        { status: 400 }
      );
    }

    // Simulate processing time between 2 to 3 seconds
    const processingTime: number = 2000 + Math.random() * 1000;
    const transcripts = generateVideoResponse(body.duration);

    return new Promise<HttpResponse<JsonBodyType>>((resolve) => {
      setTimeout(() => {
        resolve(HttpResponse.json(transcripts));
      }, processingTime);
    });
  }),
];
