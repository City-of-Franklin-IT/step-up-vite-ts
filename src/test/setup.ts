import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// Mock the auth context
vi.mock('@/context/Auth', () => ({
  useAuth: vi.fn(() => ({
    isAuthenticated: false,
    token: undefined,
    isLoading: false,
    refreshToken: vi.fn()
  })),
  AuthCtxProvider: ({ children }: any) => children
}))