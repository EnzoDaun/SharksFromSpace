// Required header for Assistants v2
export const OPENAI_BETA_HEADER = 'assistants=v2' as const;

export const OPENAI_DEFAULT_TIMEOUT_MS = 30000;

export const OPENAI_RUN_POLL_TIMEOUT_MS = 90000;
export const OPENAI_RUN_POLL_INTERVAL_MS = 1500;

export const OPENAI_THREADS_PATH = '/threads' as const;
export const OPENAI_MESSAGES_SEGMENT = '/messages' as const;
export const OPENAI_RUNS_SEGMENT = '/runs' as const;

export const OPENAI_MESSAGES_ORDER = 'desc' as const;
export const OPENAI_MESSAGES_LIMIT = 10;

export const OPENAI_RUN_STATUS_COMPLETED = 'completed' as const;
export const OPENAI_RUN_STATUS_FAILED = 'failed' as const;
export const OPENAI_RUN_STATUS_CANCELLED = 'cancelled' as const;
export const OPENAI_RUN_STATUS_EXPIRED = 'expired' as const;
export const OPENAI_RUN_STATUS_QUEUED = 'queued' as const;
export const OPENAI_RUN_STATUS_IN_PROGRESS = 'in_progress' as const;
