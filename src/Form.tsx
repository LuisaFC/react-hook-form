import { ErrorMessage } from "@hookform/error-message"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { IFormData } from "./types"
import { z } from "zod"
import { Switch } from "./components/ui/switch"


const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  age: z.number().optional(),
  zipcode: z.string(),
  city: z.string().optional(),
  street: z.string().optional(),
  blocked: z.boolean().optional()
})

type FormData = z.infer<typeof schema>;

interface IFormProps {
  user: IFormData
}

export function Form({ user }: IFormProps) {

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState,
    clearErrors,
    reset,
    setValue,
    watch,
    setError,
    control
  } = useForm<FormData>({
    values: user,
    resetOptions: {
      keepDirtyValues: true,
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    resolver: zodResolver(schema),
  })

  //Monitorando as alterações do form sem renderizar o componente a cada modificação
  useEffect(() => {
    const {unsubscribe} = watch(async (formData, {name}) => {
      const zipcode = formData.zipcode ?? ''

      if(name === 'zipcode' && zipcode.length >= 8){
        const response = await fetch(`https://viacep.com.br/ws/${zipcode}/json/`)

        const body = await response.json();

        if(body.erro){
          setError('zipcode', {
            type: 'valdiate',
            message: 'CEP informado é invalido'
          })
        }

        setValue("city", body.localidade)
        setValue("street", body.logradouro)
      }
    })

    return () => {
      unsubscribe()
    }
  },[watch, setValue])


  const handleSubmit = hookFormHandleSubmit(
    (data) => {
      console.log("Esse é o onValid")

    /*   setando novo valor como default
      resetField("name", {defaultValue: data.name}) */

      console.log("data", data)

      reset(data)
    },
    (errors) => {
      console.log("errors", errors)
    }
	)

  //verificar se o formulário está sendo submetido
  const isSubmitting =  formState.isSubmitting

  //verificar se teve campo alterado
  const isDirty = Object.keys(formState.dirtyFields).length > 0

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">

      {formState.isLoading && (
        <h1>Carregando...</h1>
      )}

      <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-96"
      >

        <div>
          <Controller
            control={control}
            name="blocked"
            render={({field}) => (
              <Switch
               /*  ref={field.ref}
                name={field.name}
                onBlur={field.onBlur} */
                onCheckedChange={field.onChange}
                checked={field.value}
                //disabled={field.disabled}
              />
            )}
          />

        </div>

        <div>
          <Input
            placeholder="Nome"
            {...register('name')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="name"
            render={({ message }) =>
              <small className="text-red-400 block">{message}</small>}
          />
        </div>

        <div>
          <Input
            type="number"
            placeholder="Idade"
            {...register('age')}
          />
          <ErrorMessage
            errors={formState.errors}
            name="age"
            render={({ message }) => <small className="text-red-400 block">{message}</small>}
          />
        </div>

        <div>
          <Input
          className="flex-1"
            type="number"
            placeholder="CEP"
            {...register('zipcode')}
          />

          <ErrorMessage
            errors={formState.errors}
            name="zipcode"
            render={({ message }) =>
              <small className="text-red-400 block">{message}</small>}
          />
        </div>

        <Input
          placeholder="Cidade"
          {...register('city')}
        />
        <Input
          placeholder="Rua"
          {...register('street')}
        />

        <div className="flex mt-4 gap-2">
          <Button
            className="flex-1"
            disabled={!isDirty || isSubmitting}>
            Salvar
          </Button>

          <Button
            className="flex-1"
            disabled={isDirty || isSubmitting}>
            Enviar
          </Button>
        </div>

        <div>
          <Button
            size="sm"
            type="button"
            variant="outline"
            onClick={() => clearErrors()}>
              Limpar Erros
          </Button>
        </div>
      </form>
    </div>
  );
}
