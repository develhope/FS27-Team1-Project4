import { useRandom } from "../custom-hooks/useRandom"

export function RandomSigns({number, className}) {
  const {randomSign} = useRandom(number, number)

  return <p className="single-random-line">{randomSign}</p>
}
