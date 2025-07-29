import { UUID } from "crypto";

export interface Account {
  id: string;
  balance: number;
  authorizedLimit: number | null;
  authorizedOverdraft: number;
}
