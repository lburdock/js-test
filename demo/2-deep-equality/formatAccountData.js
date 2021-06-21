const TA_UP_ROLES = ["ta", "teacher", "admin"];

const formatAccountData = (account) => {
  if (!account) return null;
  return {
    ...account,
    isTaUp: TA_UP_ROLES.includes(account.role),
  };
};

export default formatAccountData;
