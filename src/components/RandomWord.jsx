import { useRandom } from "../custom-hooks/useRandom"

export function RandomWord({number, className}) {
  const {randomString} = useRandom(number, number)
  return <p className="single-random-line">{randomString}</p>
}
