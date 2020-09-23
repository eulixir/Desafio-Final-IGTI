import React from 'react';

export default function ListScreen({
  transactions,
  periods,
  filteredText,
  currentPeriod,
  onDeleteTransaction,
  onEditTransaction,
  onFilterChange,
  onPeriodChange,
  onNewTransaction,
}) {
  return (
    <>
      <select
        value={currentPeriod}
        onChange={onPeriodChange}
        className="browser-default"
      >
        {periods.map((period) => (
          <option key={period}>{period}</option>
        ))}
      </select>

      <input
        className="inputTypeText"
        type="text"
        placeholder="Filtro..."
        value={filteredText}
        onChange={onFilterChange}
      ></input>
      <div>
        <button className="waves-effect waves-light btn">
          Novo Lançamento{' '}
          <span className="icon" onClick={onNewTransaction}>
            +
          </span>
        </button>
      </div>

      {transactions.map((transaction) => {
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
            <button
              className="defaultButton editButton"
              onClick={onEditTransaction}
              id={transaction._id}
            >
              Editar
            </button>
            <button
              className="defaultButton deleteButton"
              onClick={onDeleteTransaction}
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
  );
}
