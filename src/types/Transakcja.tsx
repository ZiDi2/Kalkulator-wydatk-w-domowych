export type Transaction = {
  id: string;
  name: string;
  amount: number;
  type: "Przychód" | "Wydatek";
  category: string;
};
