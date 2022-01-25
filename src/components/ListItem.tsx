import React from 'react';
import { ITransactions } from '../interfaces/ITransactions';

interface Props {
    transaction: ITransactions;
}

const ListItem: React.FC<Props> = ({ transaction }: Props) => {
    return (
        <>
            <p>{transaction.id}</p>
        </>
    );
};

export default ListItem;
