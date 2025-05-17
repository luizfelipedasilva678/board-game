import type { PowerUpType } from "../../typings";

const powerUps: {
  type: PowerUpType;
  description: string;
  advance?: number;
  retreat?: number;
}[] = [
  {
    type: "advanceAdvantage",
    description: "{player} pode avançar mais 1 casa",
    advance: 1,
  },
  {
    type: "advanceAdvantage",
    description: "{player} pode avançar mais 5 casas",
    advance: 5,
  },
  {
    type: "retreatDisadvantage",
    description: "{player} deve recuar 1 casa",
    retreat: 1,
  },
  {
    type: "retreatDisadvantage",
    description: "{player} deve recuar 2 casas",
    retreat: 2,
  },
  {
    type: "retreatDisadvantage",
    description: "{player} deve recuar 4 casas",
    retreat: 4,
  },
];

export default powerUps;
