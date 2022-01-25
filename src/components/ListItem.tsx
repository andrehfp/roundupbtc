import React from 'react';
import { ITransactions } from '../interfaces/ITransactions';
import { roundUp } from '../utils/calc';
interface Props {
    transaction: ITransactions;
}

const ListItem: React.FC<Props> = ({ transaction }: Props) => {
    return (
        <li>
            {transaction.description} - R$ {transaction.amount_cents / 100} -
            Round Up: {roundUp(transaction.amount_cents / 100, 0)} - Investment:{' '}
            {roundUp(
                roundUp(transaction.amount_cents / 100, 0) -
                    transaction.amount_cents / 100,
                3
            )}
        </li>
    );
};

export default ListItem;
