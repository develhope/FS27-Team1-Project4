/* Component author Andrea */

import { useRandom } from "../custom-hooks/useRandom"

export function DeepRandomString({stringLength}) {
  const {randomString} =useRandom(0, stringLength, 0)
  return <p>{randomString}</p>
}
