import { Optional } from "sequelize";

interface VoteAttributes {
  id: number;
  details: string;
  creationTime: Date;
  updateTime: Date;
  status: string;
  viewCount: number;
  voteCount: number;
}

type VoteCreationAttributes = Optional<VoteAttributes, "id">;
export default VoteCreationAttributes;
