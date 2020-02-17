export interface ISolveCaptcha {
  image: string;
  maxAttempts?: number;
}

export interface ResponseCaptcha {
  text: string;
  id?: string;
}
