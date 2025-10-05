import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService) {}

  get nodeEnv(): string {
    return this.config.get<string>('NODE_ENV', 'development');
  }

  get port(): number {
    return this.config.get<number>('PORT', 3000);
  }

  get httpTimeoutMs(): number {
    return this.config.get<number>('HTTP_TIMEOUT_MS', 10000);
  }

  get httpRetry(): number {
    return this.config.get<number>('HTTP_RETRY', 2);
  }
}
