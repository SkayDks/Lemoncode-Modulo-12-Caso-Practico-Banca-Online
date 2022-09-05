import {
  onUpdateField,
  onSubmitForm,
  onSetError,
  onSetFormErrors,
} from '../../common/helpers';
import { history } from '../../core/router';
import { setAccountOptions } from './transfer.helpers';
import { fromValidation } from './transfer.validators';
import {
  mapTransferFromDateNumToDate,
  mapTransferFromViewModerlToApi,
} from './transfer.mappers';
import { insertTransfer } from './transfer.api';
import { getAccountList } from '../account-list/account-list.api';

const params = history.getParams();
let transfer = {
  'select-account': '',
  iban: '',
  name: '',
  amount: undefined,
  concept: '',
  notes: '',
  date: { day: '', month: '', year: '', date: new Date() },
  email: '',
};

getAccountList().then((accountList) => {
  transfer['select-account'] = params.id;
  setAccountOptions(accountList, params.id);
});

onUpdateField('select-account', (event) => {
  const value = event.target.value;
  transfer = { ...transfer, 'select-account': value };

  fromValidation
    .validateField('select-account', transfer['select-account'])
    .then((result) => {
      onSetError('select-account', result);
    });
});

onUpdateField('iban', (event) => {
  const value = event.target.value;
  transfer = { ...transfer, iban: value };

  fromValidation.validateField('iban', transfer.iban).then((result) => {
    onSetError('iban', result);
  });
});

onUpdateField('name', (event) => {
  const value = event.target.value;
  transfer = { ...transfer, name: value };

  fromValidation.validateField('name', transfer.name).then((result) => {
    onSetError('name', result);
  });
});

onUpdateField('amount', (event) => {
  const value = event.target.value.replace(',', '.');
  fromValidation.validateField('amount', value).then((result) => {
    onSetError('amount', result);
    transfer = { ...transfer, amount: result.succeeded ? parseFloat(value) : NaN };
  });
  
});

onUpdateField('concept', (event) => {
  const value = event.target.value;
  transfer = { ...transfer, concept: value };

  fromValidation.validateField('concept', transfer.concept).then((result) => {
    onSetError('concept', result);
  });
});

onUpdateField('notes', (event) => {
  const value = event.target.value;
  transfer = { ...transfer, notes: value };

  fromValidation.validateField('notes', transfer.notes).then((result) => {
    onSetError('notes', result);
  });
});

onUpdateField('day', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    date: {
      ...transfer.date,
      day: value,
      date: mapTransferFromDateNumToDate(transfer),
    },
  };

  fromValidation.validateField('date', transfer.date.date).then((result) => {
    onSetError('date', result);
  });
});

onUpdateField('month', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    date: {
      ...transfer.date,
      month: value,
      date: mapTransferFromDateNumToDate(transfer),
    },
  };

  fromValidation.validateField('date', transfer.date.date).then((result) => {
    onSetError('date', result);
  });
});

onUpdateField('year', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    date: {
      ...transfer.date,
      year: value,
      date: mapTransferFromDateNumToDate(transfer),
    },
  };

  fromValidation.validateField('date', transfer.date.date).then((result) => {
    onSetError('date', result);
  });
});

onUpdateField('email', (event) => {
  const value = event.target.value;
  transfer = { ...transfer, email: value };

  fromValidation.validateField('email', transfer.email).then((result) => {
    onSetError('email', result);
  });
});

onSubmitForm('transfer-button', () => {
  const apiTransfer = mapTransferFromViewModerlToApi(transfer);

  fromValidation.validateForm(apiTransfer).then((result) => {
    onSetFormErrors(result);
    console.log('transfer', apiTransfer);
    if (result.succeeded) {
      insertTransfer(apiTransfer)
        .then(() => history.back())
        .catch((response) => console.log(response.data));
    }
  });
});
