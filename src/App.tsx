import { Empty } from 'antd';
import React, { useState, useEffect } from 'react';
import './App.css';
import ListItem from './components/ListItem';
import { ITransactions } from './interfaces/ITransactions';
import { roundUp } from './utils/calc';

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [content, setContent] = useState<ITransactions[]>([]);

    const [investment, setInvestment] = useState<number>(0);

    useEffect(() => {
        const transactions_array: ITransactions[] = [];
        setIsLoading(true);
        fetch('http://localhost:3004/data')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.transactions.forEach((transaction: any) => {
                    const invest = roundUp(
                        roundUp(-transaction.amount_cents / 100, 0) -
                            -transaction.amount_cents / 100,
                        3
                    );
                    setInvestment((c) => c + invest);
                    const item = {
                        id: transaction.id,
                        amount_cents: -transaction.amount_cents,
                        date: transaction.date,
                        description: transaction.description,
                    };
                    transactions_array.push(item);
                });
                setContent(transactions_array);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            {roundUp(investment, 2)}
            <ul>
                {content && content.length > 0 ? (
                    content.map((transaction: ITransactions, key: number) => {
                        return <ListItem key={key} transaction={transaction} />;
                    })
                ) : (
                    <Empty />
                )}
            </ul>
        </>
    );
};

export default App;
