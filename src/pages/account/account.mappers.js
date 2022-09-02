export const mapAccountFromApiToViewModel = (account) => {
  return {
    ...account,
    alias: account.name,
  };
};

export const mapAccountFromViewModerFromApi = ({alias, ...account }) => {
  return {
    ...account,
    name: alias,
  };
};
