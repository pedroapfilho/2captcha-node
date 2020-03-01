export interface SolveCaptcha {
  image: string;
  maxAttempts?: number;
}

export interface ResponseCaptcha {
  text: string;
  id?: string;
}
