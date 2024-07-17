import { PoolClient, Pool, QueryConfig, QueryResult, Query } from "pg";

export class BaseModel {
  private db: Pool | PoolClient;
  constructor(db: Pool | PoolClient) {
    this.db = db;
  }

  protected async query(QueryConfig: QueryConfig): Promise<any[]> {
    const result: QueryResult = await this.db.query(QueryConfig);
    return result.rows;
  }
}
