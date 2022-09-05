export const mapTransferFromViewModerlToApi = (transfer) => {
  return {
    ...transfer,
    date: transfer.date.date,
  };
};

export const mapTransferFromDateNumToDate = (transfer) =>
  (transfer.date.month || transfer.date.day || transfer.date.year ) ? new Date(`${transfer.date.month}/${transfer.date.day}/${transfer.date.year}`) : new Date();
