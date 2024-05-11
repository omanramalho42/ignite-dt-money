import React, { useContext } from 'react'
import { SearchFormContainer } from './styles'
import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionsContext } from '../../contexts/TransactionsContext'


const SearchForm:React.FC = () => {
  const { fetchTransactions } = useContext(TransactionsContext)

  const searchFormSchema = z.object({
    query: z.string()
  })
  type SearchFormInputs = z.infer<typeof searchFormSchema>
  const initialValues: z.infer<typeof searchFormSchema> ={
    query: ""
  }
  const { 
    handleSubmit, 
    register,
    formState: { isSubmitting }
  } = useForm<SearchFormInputs>({
    defaultValues: initialValues,
    resolver: zodResolver(searchFormSchema)
  });
  
  const handleSearchTransactions = async (data: SearchFormInputs)/*: Promise<any>*/ => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    await fetchTransactions(data.query);
    
    console.log(data);
  } 

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
        <input
          type="text" 
          placeholder='Busque por transações'
          {...register("query")} 
        />
        <button disabled={isSubmitting} type='submit'>
          <MagnifyingGlass size={29} />
        </button>
    </SearchFormContainer>
  )
}

export default SearchForm