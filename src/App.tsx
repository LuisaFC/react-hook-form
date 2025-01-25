import { useForm } from "react-hook-form"
import { Input } from "./components/ui/input"
import { ErrorMessage } from '@hookform/error-message';
import { Button } from "./components/ui/button";

interface IFormData {
    name: string;
    age: number;
}

function App() {
  console.log("App renderizou")

  //handleSubmit -> submit function
  //register -> input register anda validation
  //formState -> form infos
  //reset -> redefinir os campos do formulário após a submissão
  //resetField -> redefinir um campo após a submissão

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState,
    clearErrors,
    reset,
  } = useForm<IFormData>({
    defaultValues: {
      name: "",
      age: 0
    }
  })


  const handleSubmit = hookFormHandleSubmit(
    (data) => {
      console.log("Esse é o onValid")
      console.log("data", {data: data})

    /*   setando novo valor como default
      resetField("name", {defaultValue: data.name}) */

      reset()
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
      <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-96"
      >
        <div>
          <Input
            placeholder="Nome"
            {...register('name',{
              required: {
                value: true,
                message: "O nome é obrigatório"
              }
            })}
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
            {...register('age', {
              required: {
                value: true,
                message: "A idade é obrigatória"
              },
              min: 18,
              setValueAs: (age) => Number(age)
            })}
          />
          <ErrorMessage
            errors={formState.errors}
            name="age"
            render={({ message }) => <small className="text-red-400 block">{message}</small>}
          />
        </div>

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

export default App
