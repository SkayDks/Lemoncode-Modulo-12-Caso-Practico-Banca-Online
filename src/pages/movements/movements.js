import { onSetValues } from '../../common/helpers';
import { history } from '../../core/router';
import { addMovementRows } from './movements.helpers';
import { getAllMovements, getMovementsAccount } from './movements.api';
import { mapMovementListFromApiToViewModel } from './movements.mappers';
import { getAllAlias, getAllBalance } from './movements.extras';
import { mapAccountFromApiToViewModel } from '../account/account.mappers';
import { getAccount } from '../account/account.api';
import { getAccountList } from '../account-list/account-list.api';

/**
 * Me auto impuse un reto, Si se selecionara directamente la pestaña movimientos,
 * sacar la informacion de todas las cuentas
 * 
 */

const params = history.getParams();
const isEditMode = Boolean(params.id);
const getMovements = isEditMode ? getMovementsAccount : getAllMovements;

if (isEditMode) {
  getAccount(params.id).then((apiAccount) => {
    const account = mapAccountFromApiToViewModel(apiAccount);
    onSetValues(account);
    console.log(account);
  });
} else {
  getAccountList().then((accountList) => {
    const allAccounts = {
      iban: 'Todas las cuentas',
      alias: getAllAlias(accountList),
      balance: getAllBalance(accountList),
    };
    onSetValues(allAccounts);
  });
}

getMovements(params.id).then((movements) => {
  const viewModelMovements = mapMovementListFromApiToViewModel(movements);
  addMovementRows(viewModelMovements);
});
