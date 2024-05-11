import { useContext } from "react"

import { TransactionsContext } from "../../contexts/TransactionsContext"

import Header from "../../components/Header"
import SearchForm from "../../components/SearchForm"
import Summary from "../../components/Summary"

import { dateFormatter, priceFormatter } from "../../utils/formatter"

import { 
  PriceHighLight, 
  TransactionContainer, 
  TransactionsTable 
} from "./styles"

const TransactionsScreen = () => {
  const { transactions } = useContext(TransactionsContext);
  
  return (
    <main>
        <Header />
        <Summary />

        <TransactionContainer>
          <SearchForm />
          <TransactionsTable>
            <tbody>
              {transactions.map((transaction) => {
                return (
                  <tr key={transaction.id}>
                    <td width="50%">{transaction.description}</td>
                    <td>
                      <PriceHighLight variant={transaction.type}>
                        {transaction.type === "outcome" && '-'}
                        {` `} 
                        {priceFormatter.format(transaction.price)}
                      </PriceHighLight>
                    </td>
                    <td>{transaction.category}</td>
                    <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                  </tr>
                )
              })}
            </tbody>
          </TransactionsTable>
        </TransactionContainer>
    </main>
  )
}

export default TransactionsScreen