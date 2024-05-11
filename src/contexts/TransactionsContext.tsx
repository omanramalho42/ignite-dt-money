import { createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface TransactionsProps {
    id: string;
    description: string;
    type: "income" | "outcome";
    category: string;
    price: number;
    createdAt: string;
}

interface createTransactionInput {
    description: string;
    type: "income" | "outcome";
    category: string;
    price: number;
}

interface TransactionContextType {
    transactions: TransactionsProps[];
    fetchTransactions: (query?: string) => Promise<void>;
    createTransaction: (data: createTransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
    children: React.ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    
    const [transactions, setTransactions] = 
        useState<TransactionsProps[]>([]);

    const fetchTransactions = async (query: string = ""): Promise<void> => {
        const { data } = 
            await api.get("transactions", {
                params: {
                    q: query,
                    _sort: "createdAt",
                    // _order: "desc",
                }
            });
        
        setTransactions(data);
    }

    const createTransaction = async (data: createTransactionInput) => {
        const { category, description, price, type } = data;
        
        const response = await api.post("transactions", {
            description,
            category,
            type,
            price,
            createdAt: new Date(),
        })

        setTransactions(state => [response.data, ...state]);
    }

    useEffect(() => {
        fetchTransactions();
    },[]);

    return (
        <TransactionsContext.Provider 
            value={{ transactions, fetchTransactions, createTransaction }}
        >
            {children}
        </TransactionsContext.Provider>
    );
}