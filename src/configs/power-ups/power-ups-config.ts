import type { PowerUpType } from "../../typings";

const powerUps: {
  type: PowerUpType;
  description: string;
  advance?: number;
  retreat?: number;
}[] = [
  {
    type: "advanceAdvantage",
    description: "Avance 1 casa",
    advance: 1,
  },
  {
    type: "advanceAdvantage",
    description: "Avance 1 casa",
    advance: 1,
  },
  {
    type: "advanceAdvantage",
    description: "Avance 1 casa",
    advance: 1,
  },
  {
    type: "advanceAdvantage",
    description: "Avance 1 casa",
    advance: 1,
  },
  {
    type: "advanceAdvantage",
    description: "Avance 1 casa",
    advance: 1,
  },
  {
    type: "advanceAdvantage",
    description: "Avance 5 casas",
    advance: 5,
  },
  {
    type: "advanceAdvantage",
    description: "Avance 5 casas",
    advance: 5,
  },
  {
    type: "retreatDisadvantage",
    description: "Recue 1 casa",
    retreat: 1,
  },
  {
    type: "retreatDisadvantage",
    description: "Recue 1 casa",
    retreat: 1,
  },
  {
    type: "retreatDisadvantage",
    description: "Recue 1 casa",
    retreat: 1,
  },
  {
    type: "retreatDisadvantage",
    description: "Recue 4 casa",
    retreat: 4,
  },
  {
    type: "retreatDisadvantage",
    description: "Recue 2 casa",
    retreat: 2,
  },
  {
    type: "retreatDisadvantage",
    description: "Recue 2 casa",
    retreat: 2,
  },
];

export default powerUps;
