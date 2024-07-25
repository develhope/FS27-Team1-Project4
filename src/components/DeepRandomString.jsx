/* Component author Andrea */

import { useRandom } from "../custom-hooks/useRandom"

export function DeepRundomString({stringLength}) {
  const {randomString} =useRandom(0, stringLength, 0)
  return <p>{randomString}</p>
}
