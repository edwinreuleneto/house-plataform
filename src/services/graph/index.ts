// Dependencies
import { api } from '../api'

// Types
import type { SyncUsersResponse } from './graph.props'

// Services
const SyncUsers = (): Promise<SyncUsersResponse> =>
  api('/graph/sync-users', {
    method: 'POST',
  })

export { SyncUsers }
