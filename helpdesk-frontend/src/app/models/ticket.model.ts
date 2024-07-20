export interface Ticket {
    id?: number;
    title: string;
    description: string;
    category: string;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }