export interface FeedStockFormProps {
  onSubmit: (data: FeedStockFormData) => void;
}

export interface FeedStockFormData {
  title: string;
  type: string;
  originalSupplier: string;
  country: string;
  description: string;
  document: File | null;
  video: File | null;
}
