export interface ICreditCard {
    closing_date: Date;
    credit_card_id: number;
    starting_date: Date;
    transactions: {
        id: number;
        amount_cents: number;
        category_id: number;
        created_at: Date;
        description: string;
        installment: number;
        total_installments: number;
    };
}
