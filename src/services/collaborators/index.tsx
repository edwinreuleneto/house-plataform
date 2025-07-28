// Dependencies
import { api } from '../api'

// Types
import type { GetCollaboratorsResponse } from './collaborators.props'

// Services
const getCollaborators = (): Promise<GetCollaboratorsResponse> =>
  api('/graph/users', { method: 'GET' })

export { getCollaborators }
