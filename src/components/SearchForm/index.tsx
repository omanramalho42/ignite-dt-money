import React, { memo } from 'react'

import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { MagnifyingGlass } from 'phosphor-react'

import { TransactionsContext } from '../../contexts/TransactionsContext'

import { SearchFormContainer } from './styles'
import { useContextSelector } from 'use-context-selector'

/**
 * Por que que um componente renderiza?
 * Hooks changed (mudou estado, contexto, reducer);
 * Props changed (mudou prioridade);
 * Parent rendered (componente pai renderizou)
 *
 * Qual o fluxo de renderizaçao?
 * O react recria o HTML da interface daquele compoenente
 * Compara a versão do HTML recriada com a versão anterior
 * Se mudou alguma coisa, ele reescreve o HTML na tela
 *
 * Memo:
 * 0. Hooks changed, Props changed (deep comparasion)
 * 0.1 Comparar a versçao anterior dos hooks e props
 * 0.2 Se mudou algo, ele vai permitir a nova renderização
 */

const SearchFormComponent: React.FC = () => {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )

  const searchFormSchema = z.object({
    query: z.string(),
  })
  type SearchFormInputs = z.infer<typeof searchFormSchema>
  const initialValues: z.infer<typeof searchFormSchema> = {
    query: '',
  }
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    defaultValues: initialValues,
    resolver: zodResolver(searchFormSchema),
  })

  const handleSearchTransactions = async (data: SearchFormInputs) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />
      <button disabled={isSubmitting} type="submit">
        <MagnifyingGlass size={29} />
      </button>
    </SearchFormContainer>
  )
}

export const SearchForm = memo(SearchFormComponent)
