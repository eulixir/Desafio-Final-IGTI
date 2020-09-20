import React, { useEffect } from 'react';
import axios from 'axios';
import './index.css';

const api = axios.create({ baseURL: 'api' });
const RESOURCE = '/transaction';

const PERIODS = [
  '2019-01',
  '2019-02',
  '2019-03',
  '2019-04',
  '2019-05',
  '2019-06',
  '2019-07',
  '2019-08',
  '2019-09',
  '2019-10',
  '2019-11',
  '2019-12',
  '2020-01',
  '2020-02',
  '2020-03',
  '2020-04',
  '2020-05',
  '2020-06',
  '2020-07',
  '2020-08',
  '2020-09',
  '2020-10',
  '2020-11',
  '2020-12',
  '2021-01',
  '2021-02',
  '2021-03',
  '2021-04',
  '2021-05',
  '2021-06',
  '2021-07',
  '2021-08',
  '2021-09',
  '2021-10',
  '2021-11',
  '2021-12',
];

const LIST_SCREEN = 0;
const MAINTENANCE_SCREEN = 1;

export default function App() {
  const [transactions, setTransactions] = React.useState([]);
  const [filteredTransactions, setFilteredTransactions] = React.useState([]);
  const [currentPeriod, setCurrentPeriod] = React.useState(PERIODS[0]);
  const [currentScreen, setCurrentScreen] = React.useState(LIST_SCREEN);
  const [filteredText, setFilteredText] = React.useState('');

  React.useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await api.get(`/transaction?period=${currentPeriod}`);

      setTransactions(data.transactions);
    };

    fetchTransactions();
  }, [currentPeriod]);

  React.useEffect(() => {
    let newFilteredTransactions = [...transactions];

    if (filteredText.trim() !== '') {
      newFilteredTransactions = newFilteredTransactions.filter(
        (transaction) => {
          return transaction.description.toLowerCase().includes(filteredText);
        }
      );
    }
    setFilteredTransactions(newFilteredTransactions);
  }, [transactions, filteredText]);

  const handlePeriodChange = (event) => {
    const newPeriod = event.target.value;
    setCurrentPeriod(newPeriod);
  };

  const handleFilterChange = (event) => {
    const text = event.target.value.trim();
    setFilteredText(text.toLowerCase());
  };

  const handleDeleteTransaction = async (event) => {
    const id = event.target.id;

    await api.delete(`${RESOURCE}/${id}`);

    const newTrasaction = transactions.filter((transaction) => {
      return transaction._id !== id;
    });
    setTransactions(newTrasaction);
  };

  return (
    <div className="container">
      <h1 className="title">
        Desafio Final<br></br> do Bootcamp
      </h1>
      {currentScreen === LIST_SCREEN ? (
        <>
          <select
            value={currentPeriod}
            onChange={handlePeriodChange}
            className="browser-default"
          >
            {PERIODS.map((period) => (
              <option key={period}>{period}</option>
            ))}
          </select>

          <input
            className="inputTypeText"
            type="text"
            placeholder="Filtro..."
            value={filteredText}
            onChange={handleFilterChange}
          ></input>

          {filteredTransactions.map((transaction) => {
            const EARNING_COLOR = '#6ab04c';
            const EXPENSE_COLOR = '#fa080877';
            const currentColor =
              transaction.type === '+' ? EARNING_COLOR : EXPENSE_COLOR;
            return (
              <div
                key={transaction._id}
                className="transactionList"
                style={{ backgroundColor: currentColor }}
              >
                <button className="defaultButton editButton">Editar</button>
                <button
                  className="defaultButton deleteButton"
                  onClick={handleDeleteTransaction}
                  id={transaction._id}
                >
                  Apagar
                </button>
                <span className="list">
                  {transaction.yearMonthDay}{' '}
                  <strong>
                    {transaction.category}
                    {''}{' '}
                  </strong>
                  {transaction.description} - {transaction.value}
                </span>
              </div>
            );
          })}
        </>
      ) : (
        <p>Tela de manutenção</p>
      )}
    </div>
  );
}
