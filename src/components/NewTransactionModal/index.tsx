import React, { useContext } from 'react'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import * as Dialog from "@radix-ui/react-dialog"

import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'

import { 
    CloseButton, 
    Content, 
    Overlay, 
    TransactionType, 
    TransactionTypeButton, 
} from './styles'
import { TransactionsContext } from '../../contexts/TransactionsContext'

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(["income", "outcome"])
})

type newTransactionsFormInputs = z.infer<typeof newTransactionFormSchema>

const NewTransactionModal:React.FC = () => {
    const { createTransaction } = 
        useContext(TransactionsContext);

    const { 
        handleSubmit, 
        register,
        control,
        reset,
        formState: { isSubmitting } 
    } = useForm<z.infer<typeof newTransactionFormSchema>>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {
            type: "income",
        }
    })

    const handleCreateNewTransaction = async (data : newTransactionsFormInputs ) => {
        const { category, description, price, type } = data;
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        await createTransaction({
            description,
            price,
            category,
            type
        });
        reset()
    }

    return (
    <Dialog.Portal>
        <Overlay />
        <Content>
            <Dialog.Title>Nova transação</Dialog.Title>
            <CloseButton>
                <X size={24} />
            </CloseButton>

            <form 
                onSubmit={handleSubmit(handleCreateNewTransaction)}
            >   
                {/* UNCTROLLED INPUTS */}
                <input
                    type="text"
                    {...register("description")}
                    placeholder='Descrição'
                    required
                />
                <input 
                    type="number"
                    {...register("price", { valueAsNumber: true })}
                    placeholder='Preço'
                    required
                    // value={priceFormatter.format(watch("price"))}
                />
                <input 
                    type="text" 
                    {...register("category")} 
                    placeholder='Categoria' 
                    required 
                
                />
                {/* CONTROLLED INPUTS */}
                <Controller
                    control={control}
                    name="type"
                    render={({ field }) => {
                        console.log(field);

                        return (
                            <TransactionType 
                                onValueChange={field.onChange} 
                                value={field.value}
                            >
                                <TransactionTypeButton 
                                    variant='income' 
                                    value='income'
                                >
                                    <ArrowCircleUp size={24} />
                                    Entrada
                                </TransactionTypeButton>
                                <TransactionTypeButton 
                                    variant='outcome' 
                                    value='outcome'
                                >
                                    <ArrowCircleDown size={24} />
                                    Saída
                                </TransactionTypeButton>
                            </TransactionType>
                        )
                    }}
                />

                <button disabled={isSubmitting} type='submit'>
                    Cadastrar
                </button>
            </form>
        </Content>
    </Dialog.Portal>
  )
}

export default NewTransactionModal