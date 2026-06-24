export interface Character {
  id: number
  name: string
  status: "Alive" | "Dead" | "unknown"
  image: string
}
