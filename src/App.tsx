import React, { useState, useEffect } from 'react';
import './App.css';
import ListItem from './components/ListItem';
import { ITransactions } from './interfaces/ITransactions';

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [content, setContent] = useState<ITransactions[]>([]);

    useEffect(() => {
        const transactions_array: ITransactions[] = [];
        setIsLoading(true);
        fetch('http://localhost:3004/data')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.transactions.forEach((transaction: any) => {
                    const item = {
                        id: transaction.id,
                        amount_cents: transaction.amount_cents,
                        date: transaction.date,
                        description: transaction.description,
                    };
                    transactions_array.push(item);
                });
                console.log(transactions_array);
                setContent(transactions_array);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            {content && content.length > 0 ? (
                content.map((transaction: ITransactions, key: number) => {
                    return <ListItem key={key} transaction={transaction} />;
                })
            ) : (
                <p>Nothing to show here..</p>
            )}
        </>
    );
};

export default App;
