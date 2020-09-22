import React, { useEffect } from 'react';
import axios from 'axios';
import './index.css';
import ListScreen from './components/listSreen';
import MaintenanceSreen from './components/maintenanceSreen';

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
  const [selectedTransaction, setSelectedTransaction] = React.useState(null);

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

  React.useEffect(() => {
    const newScreen =
      selectedTransaction !== null ? MAINTENANCE_SCREEN : LIST_SCREEN;

    setCurrentScreen(newScreen);
  }, [selectedTransaction]);

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

  const handleEditTransaction = async (event) => {
    const id = event.target.id;

    const newSelectedTransaction = filteredTransactions.find((transaction) => {
      return transaction._id === id;
    });

    console.log(newSelectedTransaction);
    setSelectedTransaction(newSelectedTransaction);
  };

  return (
    <div className="container">
      <h1 className="title">
        Desafio Final<br></br> do Bootcamp
      </h1>
      {currentScreen === LIST_SCREEN ? (
        <ListScreen
          transactions={filteredTransactions}
          periods={PERIODS}
          currentPeriod={currentPeriod}
          filteredText={filteredText}
          onDeleteTransaction={handleDeleteTransaction}
          onFilterChange={handleFilterChange}
          onPeriodChange={handlePeriodChange}
          onEditTransaction={handleEditTransaction}
        ></ListScreen>
      ) : (
        <MaintenanceSreen transaction={selectedTransaction} />
      )}
    </div>
  );
}
