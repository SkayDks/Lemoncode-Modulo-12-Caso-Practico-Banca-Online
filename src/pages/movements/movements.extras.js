export const getAllBalance = (accountList) =>
  accountList.reduce((balance, account) => balance + account.balance, 0);

export const getAllAlias = (accountList) =>
  accountList.reduce((alias, account) => alias + account.name + ' / ', '').slice(0, -3);
