import pool from "../../config/db.js";
import { BetTransactionsResponseDTO } from "./dtos/bet-transactions.dto.js";
import { BetTransactions, BetTransaction, UserTransaction, UserTransactions } from "./transactions.model.js";

const mapRowToBetTransaction = (row:any):BetTransaction => {
    return {
        amount : row.amount,
        option: row.selected_option,
        placed_at:row.created_at,
        user_id: row.user_id
    }
}

const mapRowToUserTransaction = (row:any):UserTransaction => {
    return {
        amount : row.amount,
        placed_at:row.created_at,
        bet_id : row.bet_id,
        description : row.description
    }
}

export const getBetTransactions = async (
    betId: string
): Promise<BetTransactions> => {
    try {
        const userBets = pool.query(
            `SELECT *
            FROM user_bets
            WHERE bet_id = $1`,
            [betId]
        );
        const result = userBets.rows.map((row: any) => {
            mapRowToBetTransaction(row);
        })
        return result;
    } catch (err: any) {
        throw err;
    }
}

export const getUserTransactions = async (
    userId: string
): Promise<UserTransactions> => {
    try {
        const userBets = pool.query(
            `SELECT *
            FROM transactions
            WHERE bet_id = $1`,
            [userId]
        );
        const result = userBets.rows.map((row: any) => {
            mapRowToUserTransaction(row);
        })
        return result;
    } catch (err: any) {
        throw err;
    }
}