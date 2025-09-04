export const rateLimitConfig = {
  useRedis: false,
  global: { windowMs: 15 * 60 * 1000, max: 400 }, // 15 minutes
  userLookup: {
    ip: { windowMs: 10 * 60 * 1000, max: 30 }, // 10 minutes
    email: { windowMs: 10 * 60 * 1000, max: 5 }, // 10 minutes
  },
  login: {
    ip: { windowMs: 10 * 60 * 1000, max: 10 },
    email: { windowMs: 10 * 60 * 1000, max: 5 },
  },
  register: {
    ip: { windowMs: 60 * 60 * 1000, max: 5 },
    email: { windowMs: 24 * 60 * 60 * 1000, max: 3 },
  },
};

export function getRateLimitStore() {
  if (rateLimitConfig.useRedis) {
    // TODO: Implement Redis store when needed
  }
  return undefined;
}
